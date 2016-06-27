var ajaxPosts = [];
var ajaxThrds = {};
var refMap = [];
var Posts = [];
var opPosts = [];
var pView, dForm, pForm, pArea, makabadmin, QuickReplyLastPostNum;
var threadIntervalID = null;
var board = window.location.toString().split('/')[3];
//var isMain = window.location.pathname.indexOf('/res/') < 0;
var isIE = /*@cc_on!@*/0;

//==================================================================================================
// COMMON FUNCTIONS

//IE8 fix
if (!Array.prototype.indexOf)
{
    Array.prototype.indexOf = function(elt /*, from*/)
    {
        var len = this.length >>> 0;

        var from = Number(arguments[1]) || 0;
        from = (from < 0)
            ? Math.ceil(from)
            : Math.floor(from);
        if (from < 0)
            from += len;

        for (; from < len; from++)
        {
            if (from in this &&
                this[from] === elt)
                return from;
        }
        return -1;
    };
}

//==================================================================================================
// AJAX FUNCTIONS

function AJAX(b, id, fn)
{
	var xhr;

	if(window.XMLHttpRequest) xhr = new XMLHttpRequest()
		else if (window.ActiveXObject)
		{
			try
			{
				xhr = new ActiveXObject("Msxml2.XMLHTTP");
			}

			catch (e)
			{
				try
				{
					xhr = new ActiveXObject("Microsoft.XMLHTTP");
				}

				catch (e) {}
			}
		}
		else return false;

	xhr.onreadystatechange = function()
	{
		if(xhr.readyState != 4) return;

		if(xhr.status == 200)
		{
			var x = xhr.responseText;
			x = x.split(/<form[^>]+posts[^>]+>/)[1].split('</form>')[0];
			var thrds = x.substring(0, x.lastIndexOf(x.match(/<br[^>]+left/))).split(/<br[^>]+left[^>]*>\s*<hr[^>]*>/);

			for(var i = 0, tLen = thrds.length; i < tLen; i++)
			{
				var tNum = thrds[i].match(/<input[^>]+checkbox[^>]+>/i)[0].match(/(\d+)/)[0];
				var posts = thrds[i].split(/<table[^>]*>/);
				ajaxThrds[tNum] =
				{
					keys: [],
					pcount: posts.length
				};
				for(var j = 0, pLen = posts.length; j < pLen; j++)
				{
					var x = posts[j];
					var pNum = x.match(/<input[^>]+checkbox[^>]+>/i)[0].match(/(\d+)/)[0];
					ajaxThrds[tNum].keys.push(pNum);
					ajaxPosts[pNum] = x.substring(!/<td/.test(x) && /filesize[^>]*>/.test(x) ? x.search(/filesize[^>]*>/) - 13 : x.indexOf('<label'), /<td/.test(x) ? x.lastIndexOf('</td') : (/omittedposts[^>]*>/.test(x) ? x.lastIndexOf('</span') + 7 : x.lastIndexOf('</blockquote') + 13));
					ajaxRefmap(ajaxPosts[pNum].substr(ajaxPosts[pNum].indexOf('<blockquote>') + 12), pNum);
				}
			}

			fn();

		}
		else fn('HTTP ' + xhr.status + ' ' + xhr.statusText);
	};
	xhr.open('GET', '/' + b + '/res/' + id + '.html', true);
	xhr.setRequestHeader('Accept-Encoding', 'deflate, gzip, x-gzip');
	xhr.send();
}


function ajaxModRequest(url) {
    $alert( "Работаем..." );

    $.get( url, function(data) {
        if(data && data.Result && data.Result == 'OK') {
            $alert( "Успешно" );
            if(window.thread.id) updateThread();
            return false;
        }

        if(data && data.message) {
            $alert( "Не удалось: " + data.message_title + '(' + data.message + ')' );
            return false;
        }

        $alert( "Ошибка парсинга ответа" );
    })
        .fail(function() {
            $alert( "Ошибка запроса" );
        });
}

//==================================================================================================
// ADMIN BUTTON

function markWholeChain(num) {
    //$('.hiclass').removeClass('hiclass');
    //$('.post-wrapper input[name=delete]').removeAttr('checked');
    var to_mark = [];
    var recurse = function(arr) {
        for(var i=0;i<arr.length;i++) {
            if(to_mark.indexOf(arr[i]) >= 1) continue;

            $('#post-body-' + arr[i]).addClass('hiclass');
            $('#post-details-' + arr[i] + ' input[name=delete]').attr('checked','checked');

            to_mark.push(arr[i]);
            var post = Post(arr[i]);
            recurse(post.getReplies());
        }
    };
    recurse([num]);

    var list = '';
    var count = 0;

    while(to_mark.length) {
        count++;
        var current_num = to_mark.pop();
        if(!(count % 5)) {
            list += (current_num.toString()) + '\n';
        }else{
            list += (current_num.toString());
            if(to_mark.length) list += ',';
        }
    }

    $alert('Выделено ' + count + ' постов:\n\n' + list);
}

function areYouShure(el)
{	
	if(!confirm('Вы уверены в своих действиях?')) return false;
	if(el.className=="mod-action-edit"){
		document.location = el.href;
	} else {
		ajaxModRequest(el.href + '&json=1');
	}
    return false;
}

function writeBan(el)
{
	var reason = prompt('Напишите причину бана, пожалуйста:');
	if(reason) ajaxModRequest(el.href + '&comment=' + encodeURIComponent(reason) + '&json=1');

	return false;
}

function writePablos(el)
{
	var pablos = prompt('Укажите паблос:');
	if(pablos) ajaxModRequest(el.href + '&to=' + encodeURIComponent(pablos) + '&json=1');

	return false;
}

function writeBoard(el)
{
	var reason = prompt('Укажите доску, куда перенести тред:');
	if(reason) document.location = el.href + '&new_board=' + encodeURIComponent(reason);
	return false;
}

function addDate(n)
{
	var d = new Date();
	d.setTime(d.getTime() + n*24*60*60*1000);
	return d.getFullYear().toString() + '%2F' + (d.getMonth() + 1).toString() + '%2F' + d.getDate().toString();
}

function getMultiplePostsForBanset()
{
	var ToAction="";
	var All=document.forms['posts-form'];

	for(var i = 0; i < All.elements.length; ++i)
	{
		if(All.elements[i].checked)
		{
			ToAction += "&mod_id_" + All.elements[i].value + "=" + board + "_" + All.elements[i].value;
		}
	}

	return ToAction;
}

function removeAdminMenu(e)
{
	var el = e.relatedTarget;

    try {
        while(1)
        {
            if(el.id == 'ABU-select') break;

            else
            {
                el = el.parentNode;

                if(!el) break;
            }
        }
    }catch(e){
        //
    }

	if(!el) $del($id('ABU-select'));
}

function addAdminMenu(el)
{
	//var pNum = el.parentNode.parentNode.parentNode.id.match(/\d+/);
    var pNum = $(el).closest('.post').data('num');
	var pMultipleNums = getMultiplePostsForBanset();

	if(pMultipleNums == "")
	{
		pMultipleNums = '&mod_id_single=' + board + '_' + pNum;
	}

	document.body.appendChild($new('div',
	{
'class': 'reply',
'id': 'ABU-select',
'style':
		'left:' + ($offset(el, 'offsetLeft').toString() - 18) + 'px; top:' +
		($offset(el, 'offsetTop') + el.offsetHeight - 1).toString() + 'px',
'html':
		'<a href="/makaba/makaba.fcgi?task=moder&action=posts_del' + pMultipleNums + '" onclick="return areYouShure(this)\">Удалить</a>'
		+
		'<a href="/makaba/makaba.fcgi?task=moder&action=posts_ban' + pMultipleNums + '" onclick="return writeBan(this)\">Забанить</a>'
		+
		'<a href="/makaba/makaba.fcgi?task=moder&action=posts_ban' + pMultipleNums + '&expires=' + addDate(2) + '" onclick="return writeBan(this)\">Забанить на два дня</a>'
		+
		'<a href="/makaba/makaba.fcgi?task=moder&action=posts_ban' + pMultipleNums + '&expires=' + addDate(7) + '" onclick="return writeBan(this)\">Забанить на неделю</a>'
		+
		'<a href="/makaba/makaba.fcgi?task=moder&action=posts_ban' + pMultipleNums + '&expires=' + addDate(30) + '" onclick="return writeBan(this)\">Забанить на месяц</a>'
		+
		'<a href="/makaba/makaba.fcgi?task=moder&action=posts_del_ban' + pMultipleNums + '" onclick="return writeBan(this)\">Удалить и забанить</a>'
		+
		'<a href="/makaba/makaba.fcgi?task=moder&action=posts_del_ban' + pMultipleNums + '&expires=' + addDate(2) + '" onclick="return writeBan(this)\">Удалить и забанить на два дня</a>'
		+
		'<a href="/makaba/makaba.fcgi?task=moder&action=posts_del_ban' + pMultipleNums + '&expires=' + addDate(7) + '" onclick="return writeBan(this)\">Удалить и забанить на неделю</a>'
		+
		'<a href="/makaba/makaba.fcgi?task=moder&action=posts_del_all' + pMultipleNums + '" onclick="return areYouShure(this)\">Удалить всё</a>'
		+
		'<a href="/makaba/makaba.fcgi?task=moder&action=posts_del_all_ban' + pMultipleNums + '" onclick="return writeBan(this)\">Удалить всё и забанить</a>'
		+
		'<a href="/makaba/makaba.fcgi?task=moder&action=posts_del_all_ban' + pMultipleNums + '&expires=' + addDate(2) + '" onclick="return writeBan(this)\">Удалить всё и забанить на два дня</a>'
		+
		'<a href="/makaba/makaba.fcgi?task=moder&action=posts_del_all_in_thread_ban' + pMultipleNums + '&expires=' + addDate(2) + '" onclick="return writeBan(this)\">Удалить всё ИТТ и забанить на два дня</a>'
		+
		'<a href="/makaba/makaba.fcgi?task=moder&action=posts_del_all_in_thread' + pMultipleNums + '" onclick="return areYouShure(this)\">Удалить всё в треде</a>'
		+
		'<a href="/makaba/makaba.fcgi?task=moder&action=posts_del_file' + pMultipleNums + '" onclick="return areYouShure(this)\">Удалить файл</a>'
		+
		'<a href="/makaba/makaba.fcgi?task=moder&action=posts_mark' + pMultipleNums + '&mark_type=2" onclick="return areYouShure(this)\">Выдать предупреждение</a>'
		+
		'<a href="/makaba/makaba.fcgi?task=moder&action=posts_mark' + pMultipleNums + '&mark_type=1" onclick="return areYouShure(this)\">Метка о бане</a>'
		+
		'<a href="/makaba/makaba.fcgi?task=moder&action=thread_stick' + pMultipleNums + '" onclick="return areYouShure(this)\">Прикрепить тред</a>'
		+
		'<a href="/makaba/makaba.fcgi?task=moder&action=thread_unstick' + pMultipleNums + '" onclick="return areYouShure(this)\">Открепить тред</a>'
		+
		'<a href="/makaba/makaba.fcgi?task=moder&action=thread_open' + pMultipleNums + '" onclick="return areYouShure(this)\">Открыть тред</a>'
		+
		'<a href="/makaba/makaba.fcgi?task=moder&action=thread_close' + pMultipleNums + '" onclick="return areYouShure(this)\">Закрыть тред</a>'
		+
		'<a href="/makaba/makaba.fcgi?task=moder&action=thread_move' + pMultipleNums + '" onclick="return writeBoard(this)\">Перенести тред</a>'
		+
		'<a href="/makaba/makaba.fcgi?task=moder&action=post_edit_show' + pMultipleNums + '" class="mod-action-edit" onclick="return areYouShure(this)\">Редактировать пост</a>'
		+
		'<a href="/makaba/makaba.fcgi?task=moder&action=add_mod_tag' + pMultipleNums + '" onclick="return areYouShure(this)\">Добавить мод тег</a>'
		+
        '<a href="#" onclick="markWholeChain(' + pNum + ');return false;\">Выделить всю цепочку ответов</a>'
        +
		'<a href="/makaba/makaba.fcgi?task=moder&action=posts_del_everywhere' + pMultipleNums + '" class="mod-action-massban" onclick="return areYouShure(this)\">Удалить всё на борде</a>'
		+
		'<a href="/makaba/makaba.fcgi?task=moder&action=posts_del_everywhere_ban' + pMultipleNums + '" class="mod-action-massban" onclick="return writeBan(this)\">Удалить все и забанить на борде</a>'
	},
	{
'mouseout': removeAdminMenu
	}));
}


function removePostOptionMenu(e)
{
	var el = e.relatedTarget;

	while(1)
	{
		if(el.id == 'ABU-select') break;

		else
		{
			el = el.parentNode;

			if(!el) break;
		}
	}
	//el.removeClass('opt-open');
	if(!el) $del($id('ABU-select'));
	
}

//==================================================================================================
// SCRIPT CSS

function scriptCSS()
{
	var x = [];

	if(makabadmin != '') x.push('.postbtn-adm,.admin-element {display:inline-block !important;}');

	if(!$id('ABU-css'))
		$t('head')[0].appendChild($new('style',
	{
'id': 'ABU-css',
'type': 'text/css',
'text': x.join(' ')
	}));
	else $id('ABU-css').textContent = x.join(' ');
}

//==================================================================================================
// INITIALIZATION

function fastload()
{
	makabadmin = window.config.makabadmin;
	if(!makabadmin)	{
		makabadmin = '';
	}
	else {
        $('.mod-code-input').val(makabadmin);
        $('#mod-mark-checkbox').show();
	}
	pForm = $id('postform');
	pArea = $id('postform')[0];
	scriptCSS();
}


//my poor stuff

$(document).ready(function(){
	//mod
	if(window.thread.id) ModIp.checklvl();
	
	$('span.ip').live('click', function(e) {
        var post_el = $(this).closest('.post');
        var hadclass = post_el.hasClass('hiclass');
        $('.hiclass').removeClass('hiclass');
        if(hadclass) return;

        var num = post_el.data('num');
		var ip = $(e.target).text();
        var post = Post(num);
        var posts = post.threadPosts();
        var tmpost = Post(1);

        for(var i=0;i<posts.length;i++) {
            tmpost.num = posts[i];
			ip_ = $('#post-body-' + posts[i] + ' span.ip').html();
			
            if(!tmpost.isRendered()) continue;
			if( ip != ip_) continue;
            $('#post-body-' + posts[i]).addClass('hiclass');
        }
    });
});

ModIp = {
	query_uri: "/makaba/makaba.fcgi",
	getips: function() {
		var board = window.thread.board;
		var thread = window.thread.id;
		that = this;
		$.getJSON( this.query_uri, {'task': 'posts_panel', 'board': board, 'action': 'sparent', 'parent': thread, 'json': 1}, function( data ) {
			data['posts'].forEach(that.addpostip);
		});
	},
	addpostip: function(post) {
		var ip = '<span class="ip" style="margin-left: 10px;color: #004A99;cursor:pointer;">' + post['ip'] + '</span> <a href="http://188.40.78.19/whois/whoisinfo.bat?ip=' + post['ip'] + '" target="_blank" style="text-decoration:none;">[W]</a> <a href="/makaba/makaba.fcgi?task=posts_panel&board=' + board + '&action=sip&ip=' + post['ip'] + '" target="_blank" style="text-decoration:none;">[S]</a>';
		var exists = $('#post-details-' + post['num'] + ' .ip').html();
		if(!exists) $(ip).insertAfter( '#post-details-' + post['num'] + ' .postbtn-adm' );
	},
	checklvl: function() {
		var access;
		that = this;
		$.getJSON( this.query_uri, {'task': 'moder_panel', 'json': 1}, function( data ) {
			access = data.Access;
			if (access > 3) that.getips();
		});
	}
}


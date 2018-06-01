// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require_tree .
//= require jquery3
//= require popper
//= require bootstrap

$(function(){
    // always pass csrf tokens on ajax calls
    $.ajaxSetup({
        headers: { 'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content') }
    });
});

function add_comment(movie_id, user_id, user_name){
    let comment_input = document.getElementById('written_comment_'+movie_id);
    let comment = comment_input.value;
    if(comment === ''){
        return;
    }
    comment_input.value = '';
    console.log(comment);
    $.ajax(
        {
            method: 'POST',
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            url: '/comments',
            dataType: 'JSON',
            data: {
                comment: {
                    content: comment,
                    movie_id: movie_id,
                    user_id: user_id,
                    authenticity_token: window._token
                }
            },
            success: function (result) {
                console.log(result);
                console.log(user_name);
                var html = [
                    '<p style="font-size: medium"><b>' + user_name + '</b> says:</p>',
                    '<p style="font-size: small" align="center"><i>' + result.content + '</i></p>',
                    '<button class="btn btn-link btn-sm" onclick="delete_comment(' + movie_id + ', ' + result.id + ')">Delete</button><br><br>'
                ].join('');
                console.log(html);
                var div = document.createElement('div');
                div.setAttribute('id', movie_id + '_' + result.id);
                div.innerHTML = html;
                document.getElementById('card_'+movie_id).appendChild(div);
            },
        }
    );
}

function delete_comment(movie_id, comment_id) {
    $.ajax(
        {
            method: 'POST',
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            url: '/comments/' + comment_id,
            dataType: 'JSON',
            data: {
                _method: 'delete'
            },
            success: function (result) {
                var div = document.getElementById(movie_id + '_' + comment_id);
                document.getElementById('card_'+movie_id).removeChild(div);
            }
        }
    );
}



function getAndPopulate(start,limit,page,address){
    show(page);
    var navbuttons=`<div class="navbuttons">`;
        if(start!=0)navbuttons+=`<a class="next" href="#`+page+`?start=`+(start-25)+`&limit=`+limit+`&address=`+address+`" onclick="javascript:getAndPopulate(`+(start-25)+`,`+limit+`,'`+page+`','`+address+`')">Back | </a> `;
        navbuttons+=`<a class="back" href="#`+page+`?start=`+(start+25)+`&limit=`+limit+`&address=`+address+`" onclick="javascript:getAndPopulate(`+(start+25)+`,`+limit+`,'`+page+`','`+address+`')">Next</div>`;
    getJSON(server+'?action='+page+'&address='+address+'&start='+start+'&limit='+limit).then(function(data) {
        var contents="";        
        contents=contents+`<table class="itemlist" cellspacing="0" cellpadding="0" border="0"><tbody>`;
        for(var i=0;i<data.length;i++){
            contents=contents+getHTMLForPost(data[i],i+1+start);
        }
        contents=contents+"<tr><td/><td/><td>"+navbuttons+"</td></tr></tbody></table>";
        document.getElementById(page).innerHTML = contents; //display the result in an HTML element
        
    }, function(status) { //error detection....
        alert('Something went wrong.');
    });

}

function getAndPopulateTopic(start,limit,topicname){
    var page="topic";
    show(page);
    var navbuttons=`<div class="navbuttons">`;
        if(start!=0)navbuttons+=`<a class="next" href="#`+page+`?topicname=`+ encodeURIComponent(topicname)+`&start=`+(start-25)+`&limit=`+limit+`" onclick="javascript:getAndPopulateTopic(`+(start-25)+`,`+limit+`,'`+topicname+`')">Back | </a> `;
        navbuttons+=`<a class="back" href="#`+page+`?topicname=`+ encodeURIComponent(topicname)+`&start=`+(start+25)+`&limit=`+limit+`" onclick="javascript:getAndPopulateTopic(`+(start+25)+`,`+limit+`,'`+topicname+`')">Next</div>`;
    getJSON(server+'?action='+page+'&topicname='+encodeURIComponent(topicname)+'&start='+start+'&limit='+limit).then(function(data) {
        var contents="";        
        contents=contents+`<table class="itemlist" cellspacing="0" cellpadding="0" border="0"><tbody>`;
        for(var i=0;i<data.length;i++){
            contents=contents+getHTMLForPost(data[i],i+1+start);
        }
        contents=contents+"<tr><td/><td/><td>"+navbuttons+"</td></tr></tbody></table>";
        document.getElementById(page).innerHTML = contents; //display the result in an HTML element
        
    }, function(status) { //error detection....
        alert('Something went wrong.');
    });

}

/*
function getAndPopulatePosts(start,limit){
    show('posts');

    var navbuttons=`<div class="navbuttons">`;
        if(start!=0)navbuttons+=`<a class="next" href="#posts?start=`+(start-25)+`&limit=`+limit+`" onclick="javascript:getAndPopulatePosts(`+(start-25)+`,`+limit+`)">Back | </a> `;
        navbuttons+=`<a class="back" href="#posts?start=`+(start+25)+`&limit=`+limit+`" onclick="javascript:getAndPopulatePosts(`+(start+25)+`,`+limit+`)">Next</div>`;
    getJSON(server+'?action=posts&address='+pubkey+'&start='+start+'&limit='+limit).then(function(data) {
        var contents="";
        contents=contents+`<table class="itemlist" cellspacing="0" cellpadding="0" border="0"><tbody>`;
        for(var i=0;i<data.length;i++){
            contents=contents+getHTMLForPost(data[i],i+1);
        }
        contents=contents+"<tr><td/><td/><td>"+navbuttons+"</td></tr></tbody></table>";
        document.getElementById('posts').innerHTML = contents; //display the result in an HTML element
        
    }, function(status) { //error detection....
        alert('Something went wrong.');
    });

}

function getAndPopulateComments(start,limit){
    show('posts');

    var navbuttons=`<div class="navbuttons">`;
        if(start!=0)navbuttons+=`<a class="next" href="#comments?start=`+(start-25)+`&limit=`+limit+`" onclick="javascript:getAndPopulateComments(`+(start-25)+`,`+limit+`)">Back | </a> `;
        navbuttons+=`<a class="back" href="#comments?start=`+(start+25)+`&limit=`+limit+`" onclick="javascript:getAndPopulateComments(`+(start+25)+`,`+limit+`)">Next</div>`;
    getJSON(server+'?action=comments&address='+pubkey+'&start='+start+'&limit='+limit).then(function(data) {
        var contents="";
        contents=contents+`<table class="itemlist" cellspacing="0" cellpadding="0" border="0"><tbody>`;
        for(var i=0;i<data.length;i++){
            contents=contents+getHTMLForPost(data[i],i+1);
        }
        contents=contents+"<tr><td/><td/><td>"+navbuttons+"</td></tr></tbody></table>";
        document.getElementById('comments').innerHTML = contents; //display the result in an HTML element
        
    }, function(status) { //error detection....
        alert('Something went wrong.');
    });

}*/



function getHTMLForPost(data,rank){
    return `<tr class="athing">
                <td class="title" valign="top" align="right"><span class="rank">`+rank+`.</span></td>
                <td class="votelinks" valign="top"><center><a href="javascript:;" onclick="likePost('`+ds(data.txid)+`')"><div class="votearrow" title="upvote"></div></a></center></td>
                <td class="title"><a href="#thread?post=`+ds(data.roottxid)+`" onclick="showThread('`+ds(data.roottxid)+`')">`+anchorme(ds(data.message),{attributes:[{name:"target",value:"_blank"}]})+`</a> `+
                (data.topic==''?"":`<a href="#topic?topicname=`+encodeURIComponent(data.topic)+`&start=0&limit=25" onclick="showTopic(0,25,'`+ds(data.topic)+`')">(`+data.topic+`)</a>`)+
            `</td>
            </tr>
            <tr>
                <td colspan="2"></td>
                <td class="subtext"><span class="score">`+ds(data.likes)+` likes and `+ds(data.tips)+` sats</span> by <a href="#member?address=`+ds(data.address)+`" onclick="showMember('`+ds(data.address)+`')" class="hnuser">`+ds(data.name)+`</a> <span class="age"><a>`+timeSince(data.firstseen)+`</a></span> | <a href="#thread?post=`+ds(data.roottxid)+`" onclick="showThread('`+ds(data.roottxid)+`')">`+(ds(data.replies)-1)+`&nbsp;comments</a> | <a target="memo" href="https://memo.cash/memo/reply/`+ds(data.txid)+`">reply</a></td>
            </tr>
            <tr class="spacer" style="height:5px"></tr>`;
}

function likePost(txid){
    if(privkey==""){
        alert("You must login with a private key to like posts.");
        return false;
    }

    //var compresskey=new bch.PrivateKey(privkey).toString(bch.PrivateKey.compresskey);
    //alert(compresskey);
    var reversetx=txid.match(/[a-fA-F0-9]{2}/g).reverse().join('');
    const tx = {
        data: ["0x6d04","0x"+reversetx],
        cash: { key: privkey }
      }
      datacash.send(tx, function(err, res) {
        updateStatus(res);
        updateStatus(err);
      })
}

function updateStatus(message){
    document.getElementById("status").innerHTML = message;
}



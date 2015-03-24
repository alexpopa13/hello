/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');


        // FB connection init
        openFB.init({appId: FB_CLIENT_ID});
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {

        $("#fb-login").click(function () {
            login();
        });
        console.log('Received Event: ' + id);
    }
};

app.initialize();

function login() {
    console.log('FB connect');
    openFB.login(
            function (response) {
                if (response.status === 'connected') {
                    alert('Facebook login succeeded, got access token: ' + response.authResponse.token);
                    getInfo();
                } else {
                    alert('Facebook login failed: ' + response.error);
                }
            }, {scope: 'email,read_stream,publish_stream'});
}

function getInfo() {
    openFB.api({
        path: '/me',
        success: function (data) {
            // console.log(JSON.stringify(data));
            document.getElementById("userName").innerHTML = data.name;
            document.getElementById("userPic").src = 'http://graph.facebook.com/' + data.id + '/picture?type=small';

            todoItemTable = client.getTable('todoitem');
            insertUser(data, todoItemTable);

        },
        error: errorHandler});
}

function share() {
    openFB.api({
        method: 'POST',
        path: '/me/feed',
        params: {
            message: document.getElementById('Message').value || 'Testing Facebook APIs'
        },
        success: function () {
            alert('the item was posted on Facebook');
        },
        error: errorHandler});
}

function revoke() {
    openFB.revokePermissions(
            function () {
                alert('Permissions revoked');
            },
            errorHandler);
}

function logout() {
    openFB.logout(
            function () {
                alert('Logout successful');
            },
            errorHandler);
}

function errorHandler(error) {
    alert(error.message);
}

function gmailLogin() {
    var lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN);
    lock.show(function (err, profile, token) {
        if (err) {
            // Error callback
            alert('There was an error');
        } else {
            // Success calback

            // Save the JWT token.
            localStorage.setItem('userToken', token);
            // Save the profile
            var userProfile = profile;
            console.log(userProfile.email);
        }
    });
}


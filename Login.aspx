<%@ Page Language="VB" AutoEventWireup="false" CodeFile="Login.aspx.vb" Inherits="Login" %>

<%@ Import Namespace="System.Web.Optimization" %>

<!DOCTYPE html>
<meta http-equiv="X-UA-Compatible" content="IE=EDGE" />
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="Resources/System/Insys.ico" />
    <title>Insys HRMS</title>
    <meta charset="UTF-8" />
    <meta name="description" content="Integrated Online System(IONS) and Human Resource Management System(HRMS) - Authors:Mark Follero, Rossu Belmonte" />
    <meta name="keywords" content="HRMS,Human Resource Management System,Mark Follero,AngularJs,Rossu Belmonte" />
    <meta name="author" content="Mark Follero,topefollero22@gmail.com" />
    <link rel="author" href="https://facebook.com/topefollero22" />
    <%--<link rel="stylesheet" type="text/css" href="Styles/System/bootstrap.3.2.min.css" />
    <link rel="stylesheet" type="text/css" href="Styles/System/font-awesome.min.css" />
    <link rel="stylesheet" type="text/css" href="Styles/Default/default.css" />
    <link rel="stylesheet" type="text/css" href="Styles/Default/additional.css" />
    <link rel="stylesheet" type="text/css" href="Styles/System/loading-bar.css" />--%>

    <asp:PlaceHolder ID="PlaceHolder1" runat="server">
        <%: Styles.Render("~/Styles/System/login-css") %> 
    </asp:PlaceHolder>
    <%--<script src="Scripts/angular.min.1.2.22.js" type='text/javascript'></script>
    <script src="Scripts/ui-bootstrap-tpls.js" type='text/javascript'></script>
    <script src="Scripts/loading-bar.js" type='text/javascript'></script>--%>
</head>
<body id="extr-page" class="desktop-detected" ng-app="app" ng-controller="LoginCtrl">
    <%If (System.Configuration.ConfigurationManager.AppSettings("EnableOccasionEffects") = True And currentMonth = 12) Then%>
    <ul class="lightrope">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
    </ul>
    <%End If%>
    <div id="main" role="main">
        <div class="lg-bg"></div>
        <div id="content" class="container logincss">
            <div class="row" style="margin: 0px;">
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 hidden-xs hidden-sm" style="padding: 0px!important;">
                    <%--<div id="myCarousel" class="carousel carousel-fade" data-ride="carousel" interval="10000">
                        <div class="carousel-inner">
                            <div class="item active">
                                <p class="p-head">Quick and Easy 1</p>
                                <p class="p-sub">Making the world a better place.</p>
                            </div>

                            <div class="item">
                              <p class="p-head">Quick and Easy 2</p>
                                <p class="p-sub">Making the world a better place.</p>
                            </div>
                  
                            <div class="item">
                              <p class="p-head">Quick and Easy 3</p>
                                <p class="p-sub">Making the world a better place.</p>
                            </div>
                        </div>
                    </div>--%>
                    <div class="carousel-fade" carousel interval="10000">
                        <div class="crsl-inner" slide>
                            <div class="company-lgo"></div>
                            <p class="p-sub">Integrated Online Employment Services is an online facility which promotes a paperless and fully streamlined implementation of the organization’s time and attendance policies.</p>
                        </div>
                        <%--<div class="crsl-inner" slide>
                            <p class="p-head">Secure.</p>
                            <p class="p-sub">IONS defines access rights and data security.</p>
                        </div>
                        <div class="crsl-inner" slide>
                            <p class="p-head">Flexible.</p>
                            <p class="p-sub">IONS provides accessibility to single or multiple companies.</p>
                        </div>--%>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6" style="padding: 0px!important;">
                    <div class="no-padding login-right" ng-show="register == 1">
                        <form id="login-form" name="login_form" class="smart-form client-form" novalidate="novalidate">
                            <div style="display: flex; flex-wrap: wrap;">
                                <div class="company-lgo2"></div>
                            </div>

                            <fieldset>
                                <section>
                                    <label class="input" ng-class="{ 'state-error' : login_form.txtusername.$invalid && login_form.submitted  }">
                                        <i class="icon-append fa fa-user"></i>
                                        <input type="text" id="txtusername" name="txtusername" placeholder="Username" ng-model="master.Username" required>
                                    </label>
                                    <%-- <b class="tooltip tooltip-top-right"><i class="fa fa-user txt-color-teal"></i> Please enter email address/username</b><em for="email" class="invalid">Please enter your email address</em>--%>
                                </section>

                                <section>
                                    <label class="input">
                                        <i class="icon-append fa fa-lock" ng-mouseup="revertPword($event)" ng-mousedown="showPword($event)"></i>
                                        <input type="password" id="txtpassword" name="txtpassword" placeholder="Password" ng-model="master.Password">
                                    </label>
                                    <%-- <b class="tooltip tooltip-top-right"><i class="fa fa-lock txt-color-teal"></i> Enter your password</b><em for="password" class="invalid">Please enter your password</em>--%>
                                    <div class="note">
                                        <a ng-click="ChangeForgotPassword()" style="color: #eee;">Forgot password?</a>
                                        <p class="error" ng-if="WithError">{{error_message}}</p>
                                    </div>
                                </section>

                            </fieldset>
                            <footer>
                                <button type="submit" class="btn btn-primary" ng-click="Login()">
                                    Sign in
                                </button>
                            </footer>
                        </form>

                    </div>

                    <div class="well no-padding login-right" ng-show="register == 2">
                        <form id="Form1" name="forgot_password" class="smart-form client-form" novalidate="novalidate">
                            <div class="company-lgo2"></div>
                            <fieldset>
                                <section>
                                    <label class="input" ng-class="{ 'state-error' : forgot_password.txtusername.$invalid && forgot_password.submitted  }">
                                        <i class="icon-append fa fa-user"></i>
                                        <input type="text" id="txtuser" placeholder="Username" name="txtusername" ng-model="forgot_password.Username" required>
                                    </label>
                                    <label class="label">Security Question</label>
                                    <label class="input" ng-class="{ 'state-error' : forgot_password.txtQuestion.$invalid && forgot_password.submitted  }">
                                        <select style="width: 96.4%;" class="form-control" name="txtQuestion" ng-model="forgot_password.ID_SecurityQuestion" required>
                                            <option value="" selected>-Select One-</option>
                                            <option style="color: #333;" ng-repeat="d in QuestionList" value="{{d.ID}}">{{d.Name}}</option>
                                        </select>
                                    </label>
                                    <label class="label">Security Answer</label>
                                    <label class="input" ng-class="{ 'state-error' : forgot_password.txtSecurity.$invalid && forgot_password.submitted  }">
                                        <i class="icon-append fa fa-lock"></i>
                                        <input type="text" id="txtSecurity" placeholder="Type your answer here" name="txtSecurity" ng-model="forgot_password.SecurityAnswer" required>
                                    </label>
                                    <div class="note">
                                        <p class="error" ng-if="WithError">{{error_message}}</p>
                                        <p class="success">{{success_message}}</p>
                                    </div>
                                    <%-- <b class="tooltip tooltip-top-right"><i class="fa fa-user txt-color-teal"></i> Please enter email address/username</b><em for="email" class="invalid">Please enter your email address</em>--%>
                                </section>

                            </fieldset>
                            <footer>
                                <button type="submit" class="btn1 btn-primary" style="border: 1px solid #2ecc71;" ng-click="ForgotPassword()">
                                    Submit
                                </button>
                                <button type="submit" class="btn1 btn-primary" style="background-color: transparent!important; border: 1px solid;" ng-click="Back()">
                                    Back
                                </button>
                            </footer>
                        </form>

                    </div>

                    <div class="well no-padding login-right" ng-show="register == 3">
                        <form id="register_form" name="register_form" class="smart-form client-form" novalidate="novalidate">
                            <header>
                                Registration is FREE*
                            </header>
                            <fieldset>
                                <section>
                                    <label class="input" ng-class="{ 'state-error' : register_form.txtRegUsername.$invalid && register_form.submitted  }">
                                        <i class="icon-append fa fa-user"></i>
                                        <input type="text" name="txtRegUsername" id="txtRegUsername" placeholder="Username" ng-model="registration.RegUsername" required>
                                        <b class="tooltip tooltip-bottom-right">Needed to enter the website</b>
                                    </label>
                                </section>

                                <section>
                                    <label class="input" ng-class="{ 'state-error' : register_form.txtRegPassword.$invalid && register_form.submitted  }">
                                        <i class="icon-append fa fa-lock"></i>
                                        <input type="password" name="txtRegPassword" id="txtRegPassword" placeholder="Password" ng-model="registration.RegPassword" required>
                                        <b class="tooltip tooltip-bottom-right">Don't forget your password</b>
                                    </label>
                                </section>

                                <section>
                                    <label class="input" ng-class="{ 'state-error' : register_form.txtRegConfirmPassword.$invalid && register_form.submitted  }">
                                        <i class="icon-append fa fa-lock"></i>
                                        <input type="password" name="txtRegConfirmPassword" id="txtRegConfirmPassword" placeholder="Confirm password" ng-model="registration.RegConfirmPassword" required>
                                        <b class="tooltip tooltip-bottom-right">Don't forget your password</b>
                                    </label>
                                </section>
                            </fieldset>

                            <fieldset>
                                <div class="row">
                                    <section class="col col-6">
                                        <label class="input" ng-class="{ 'state-error' : register_form.txtRegFirstName.$invalid && register_form.submitted  }">
                                            <input type="text" name="txtRegFirstName" id="txtRegFirstName" placeholder="First Name" ng-model="registration.RegFirstName" required>
                                    </section>

                                    <section class="col col-6">
                                        <label class="input" ng-class="{ 'state-error' : register_form.txtRegLastName.$invalid && register_form.submitted  }">
                                            <input type="text" name="txtRegLastName" id="txtRegLastName" placeholder="Last Name" ng-model="registration.RegLastName" required>

                                            <div class="note">

                                                <p class="error">{{error_reg_message}}</p>
                                            </div>
                                    </section>
                                </div>
                            </fieldset>

                            <footer>
                                <button type="submit" class="btn btn-primary" ng-click="Register()">
                                    Register
                                </button>
                            </footer>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <p class="powered-by hidden-sm hidden-xs"><sup>Powered by</sup>  Intellismart Technology Inc.</p>
    </div>
    <div growl-notifications class="notifications"></div>
</body>
<asp:placeholder id="PlaceHolder2" runat="server">
    <%: Scripts.Render("~/bundles/login-script") %>
</asp:placeholder>
<script type="text/javascript" src="Scripts/login.js?ver=1.0"></script>
<script src="Scripts/jquery-1.9.1.min.js"></script>
<script src="Scripts/jquery.signalR-1.0.0.js"></script>
<script src="Scripts/lz-string.min.js"></script>
<%--<script src="Scripts/Client.js"></script>--%> <%--Enable only if use for Unification--%>
<script src="Scripts/bootstrap/bootstrap.js"></script>
</html>

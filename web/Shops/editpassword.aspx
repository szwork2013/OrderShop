<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="editpassword.aspx.cs" Inherits="web.Shops.editpassword" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
    <title><%=webset.WebName%></title>
    <link href="/css/style.css" rel="stylesheet" type="text/css" />
    <style type="text/css">
#dh00 #dh03 a{color:#ff6600;font-weight:bold}
</style>
</head>
<body>
    <form id="form1" runat="server">
    <ucl:Header ID="Header" runat="server" />
    <div id="main">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="80%" height="20" id="path2">当前位置：<a href="/">首页</a> > 商家管理中心</td>
    <td width="4%">&nbsp;</td>
    <td width="16%" id="path3">&nbsp;</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin:10px 0">
  <tr>
    <td width="190" valign="top"><ucl:UserLeft2 ID="UserLeft2" runat="server" />
</td>
    <td width="20">&nbsp;</td>
    <td valign="top"><table width="100%" border="0" cellspacing="0" cellpadding="0" height="31" background="/images/yncf_73.gif">
      <tr>
        <td width="2%">&nbsp;</td>
        <td width="79%">
<div id="me1">
<ul>
<li id="mee0" class="me3" onclick="mee(0)">登入密码修改</li>
</ul>
</div>
</td>
        <td width="19%">&nbsp;</td>
      </tr>
    </table>

<!--内容-->
<table border="0" cellspacing="0" cellpadding="0" class="af2">
  <tr>
    <td height="35" colspan="2" background="/images/yncf_86.gif" style="border-bottom:1px solid #dcdcdc;font-weight:bold;padding-left:30px;">修改密码</td>
    </tr>
  <tr>
    <td width="32%" height="50" align="right">您的旧密码：</td>
    <td width="68%"> <input type="password" id="txt_OldPwd" runat="server" /></td>
  </tr>
  <tr>
    <td height="50" align="right">请输入新密码：</td>
    <td><input type="password" id="txt_pwd" runat="server" /></td>
  </tr>
  <tr>
    <td height="50" align="right">请再次输入新密码：</td>
    <td><input type="password" id="txt_repwd" runat="server" /><br />
        <asp:CompareValidator ID="CompareValidator1" runat="server" ErrorMessage="两次密码输入不一致" ControlToCompare="txt_pwd" ControlToValidate="txt_repwd"></asp:CompareValidator>
    </td>
  </tr>
  <tr>
    <td height="50" colspan="2" align="center"><asp:LinkButton ID="btnSubmit" runat="server" onclick="btnSubmit_Click"><img src="/images/yncf_85.gif" width="75" height="25" /></asp:LinkButton></td>
  </tr>
</table>
</td>
  </tr>
</table>
</div>
    <ucl:Footer ID="Footer" runat="server" />
    </form>
</body>
</html>

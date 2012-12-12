﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Text;
using System.Net;
using System.IO;

using Cudo.Entities;
using Cudo.Business;
using Cudo.Common;

namespace web.WebService
{
    /// <summary>
    /// UserInfo 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消对下行的注释。
    // [System.Web.Script.Services.ScriptService]
    public class UserAccount : System.Web.Services.WebService
    {
        /// <summary>
        /// 修改用户密码
        /// </summary>
        /// <param name="username"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        [WebMethod]
        public string chanagePassword(string username, string password)
        {
            UsersBLL bll = new UsersBLL();
            int userId = bll.CheckUserIDByUserName(username);

            if (bll.UpdatePass(password, userId) > 0)
            {
                return "ok";
            }
            else {
                return null;
            }
        }

        /// <summary>
        /// 更改个人资料
        /// </summary>
        /// <param name="values"></param>
        /// <returns></returns>
        [WebMethod]
        public String changeMemberInfo(String values)
        {
            UserInfo item = new UserInfo();
            UsersBLL bll = new UsersBLL();
            JObject orderObject = JObject.Parse(values);

            item.Id = Convert.ToInt32(orderObject["id"].ToString());
            item.UserGroup = Convert.ToInt32(orderObject["usergroup"].ToString());
            item.Gender = Convert.ToInt32(orderObject["gender"].ToString());
            item.NickName = orderObject["nickName"].ToString().Replace("\"", "");
            item.Mobile = orderObject["phone"].ToString().Replace("\"", "");
            item.Email = orderObject["email"].ToString().Replace("\"", "");
            item.Birthday = orderObject["birthday"].ToString().Replace("\"", "");
            item.Address = orderObject["address"].ToString().Replace("\"", "");

            if (bll.UpdateUser(item) > 0)
            {
                return "ok";
            }
            else
            {
                return "fail";
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="username"></param>
        /// <param name="email"></param>
        /// <param name="password"></param>
        /// <returns> 0:成功 1:用户名已注册 2:手机已经注册  3:邮箱已经被使用, -1:未知错误</returns>
        [WebMethod]
        public int registerAccount(string username, string mobile, string email, string password)
        {
            int returnCode = 0;

            if (CheckUserName(username))
            {
                if (CheckMobile(mobile))
                {
                    if (CheckEmail(email))
                    {
                        returnCode = saveAccount(username, mobile, email, password);
                    }
                    else
                    {
                        returnCode = 3;
                    }
                } 
                else
                {
                    returnCode = 2;
                }
            }
            else 
            {
                returnCode = 1;
            }

            return returnCode;
        }

        private int saveAccount(string username, string mobile, string email, string password)
        {
            UsersBLL bll = new UsersBLL();
            UserInfo item = new UserInfo();
            item.UserName = username;
            item.Mobile = mobile;
            item.Email = email;
            item.NickName = "";
            item.UserPass = Utils.MD5Encrypt32(password);
            item.Gender = 0;
            item.Birthday = "";
            item.Address = ",,||2";
            item.Utype = 0;
            item.ShopId = 0;
            item.TotalPoint = 20;
            item.PromotionId = 0;

            if (bll.AddUser(item) > 0)
            {
                return 0;
            }
            else return -1;
        }

        private Boolean CheckUserName(string username)
        {
            int userid = new UsersBLL().CheckUserIDByUserName(username);
            if (userid > 0)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        private Boolean CheckMobile(string mobile)
        {
            int userid = new UsersBLL().CheckUserByMobile(mobile);
            if (userid > 0)
            {
                return false;
            }
            else
            {
                return true;
            }

        }

        private Boolean CheckEmail(string email)
        {
            int userid = new UsersBLL().CheckUserByEmail(email);
            if (userid > 0)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        [WebMethod]
        public List<OrderInfo> getOrderList(int userid)
        {
            OrdersBLL bll = new OrdersBLL();
            return bll.GetListByUserId(1, 1, userid);
        }
    }
}

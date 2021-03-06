$(document).ready(function() {
    $(window).scroll(function() {
        if ($(window).scrollTop() > 126) {
            $("#rightCol").addClass("fixed-top");
        } else {
            $("#rightCol").removeClass("fixed-top");
        }
    });
    refresh();
});

function checklogin() {
    if (!document.getElementById("userinfo")) {
        //alert("您还未登录，请先登录!");
        return false;
    } else {
        return true;
    }
}

function refresh() {
    var shopid = $("#hidden_shopid").val(); 
    $.ajax({
        type: "POST", //用POST方式传输
        url: "/ashx/ShoppingCart.ashx?action=init&shopid=" + shopid + "&A=" + Math.random(), //目标地址
        success: function(returnData) {
            $("#order_list").html(returnData);
        }
    });
}

function AddShoppingCar(itemid) {
    if (!checklogin()) {
        window.self.location = "login.aspx";
        return;
    } else {
        checkaddress(itemid);
    }
}

function prompt(e) {
    var newValue = $(e).attr("value");
    if (newValue <= 0) {
        deleteitem(e);
        return;
    }
    var itemid = $(e).parent().parent().find("#productId").attr("value");
    var shopid = $(e).parent().parent().find("#shopId").attr("value");
    $.ajax({
        type: "POST", //用POST方式传输
        url: "/ashx/ShoppingCart.ashx?action=change&num=" + newValue + "&proid=" + itemid + "&shopid=" + shopid + "&A=" + Math.random(), //目标地址
        success: function(returnData) {
            $("#order_list").html(returnData);
        }
    });
}

function minusitem(e) {
    var inputObject = $(e).parent().find("input");
    var oldValue = inputObject.val();
    inputObject.val(parseInt(oldValue) - 1);
    prompt(inputObject);
}

function additem(e) {
    var inputObject = $(e).parent().find("input");
    var oldValue = inputObject.val();
    inputObject.val(parseInt(oldValue) + 1);
    prompt(inputObject);
}

function deleteitem(e) {
    var itemid = $(e).parent().parent().find("#productId").attr("value");
    var shopid = $(e).parent().parent().find("#shopId").attr("value");
    $.ajax({
        type: "POST", //用POST方式传输
        url: '/ashx/ShoppingCart.ashx?action=delete&proid=' + itemid + '&shopid=' + shopid + '&A=' + Math.random(), //目标地址
        success: function(returnData) {
            $("#order_list").html(returnData);
        }
    });
}

function deleteall() {
    $.ajax({
        type: "POST", //用POST方式传输
        url: '/ashx/ShoppingCart.ashx?action=deleteall&A=' + Math.random(), //目标地址
        success: function(returnData) {
            $("#order_list").html(returnData);
        }
    });
}

function checkshoptime(itemid) {
    var shopid = $("#hidden_shopid").val();
    $.ajax({
        type: "post",
        dataType: "json",
        url: '/ashx/CheckHandler.ashx?action=checktime&shopid=' + shopid + '&A=' + Math.random(), //目标地址
        success: function(json) {
            if (json.types == "0") {
                alert(json.msg);
            } else {
                var shopid = $("#hidden_shopid").val();
                if ($(".shopcar_products").html() == null || $(".shopcar_products").attr("id") == "shop_" + shopid) {
                    $.ajax({
                        type: "POST", 
                        url: "/ashx/ShoppingCart.ashx?action=add&proid=" + itemid + "&shopid=" + shopid + "&A=" + Math.random(),
                        success: function(returnData) {
                            $("#order_list").html(returnData);
                        },
                        error: function(err) {
                            alert("添加失败!请稍后重试");
                        }
                    });
                }
            }
        }
    });
}

function checkaddress(itemid) {
    var shopid = $("#hidden_shopid").val();
    $.ajax({
        type: "post",
        dataType: "json",
        url: '/ashx/CheckHandler.ashx?action=checkadd&shopid=' + shopid + '&A=' + Math.random(), //目标地址
        success: function(json) {
            if (json.types == "0") {
                if (json.adtype == "0") {
                    $("#mdyadd").click();
                }
                if (json.adtype == "1") {
                    alert(json.msg);
                    //$("#mdyadd2").click();
                    window.location = "setaddress.aspx";
                }
            } else {
                checkshoptime(itemid);
            }
        }
    });
}

function carnext() {
    var limit = $("#limit").html();
    var usepoint = $("#usepoint").attr("value");
    $.ajax({
        type: "get",
        dataType: "json",
        url: '/ashx/CheckHandler.ashx?action=checkpoint&limit=' + limit + '&usepoint=' + usepoint + '&A=' + Math.random(), //目标地址
        success: function(json) {
            if (json.types == "0") {
                alert(json.msg);
                return;
            } else {
                window.self.location = "shoppingsure.aspx";
            }
        }
    });
}

function ShowConfirm(text) {
    return confirm(text);
}
function Showalert(text) {
    alert(text);
}




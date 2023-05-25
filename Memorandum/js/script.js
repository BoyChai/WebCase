window.onload = function () {

    // 备忘录盒子
    const list_box = document.querySelector(".list-box")

    // 输入框
    const list_input = document.querySelector(".list-input>input")

    // 备忘录展示
    const list_body = document.querySelector(".list-box>.list-body")

    // 一言展示框
    const remark_body = document.querySelector(".remark>.remark-body")

    // 备忘录的内容
    let memorandumData = {}


    // 备忘录信息获取
    function getMemorandum() {
        $.ajax({
            type:"get",
            url:"https://api.boychai.xyz/test/v1/memorandum/list",
            success: function (data) {
                if (data.data.length>13) {
                    list_box.style.height = 400 + ((data.data.length-13)*20.67) +"px";
                } else {
                    list_box.style.height=400+"px";
                }
                memorandumData = data.data
                displayMemorandum()
            }
        })
    }

    // 提交备忘录
    list_input.onkeydown = function (y) {
        if (y.key == "Enter") {
            $.ajax({
                type:"get",
                url:"https://api.boychai.xyz/test/v1/memorandum/create",
                data: {
                    title:" ",
                    text:list_input.value,
                },
                success:function(){
                    getMemorandum()
                }
            });
            list_input.value = "";
        }
    }
    // 删除备忘录
    function onDelete(btns) {
        for (let i = 0; i < btns.length; i++) {
            btns[i].onclick = function () {
                $.ajax({
                    type:"DELETE",
                    url:"https://api.boychai.xyz/test/v1/memorandum/del",
                    data: JSON.stringify({'id':parseInt(btns[i].getAttribute("memorandumid"))}),
                    contentType: 'application/json',
                    success:function () {
                        getMemorandum()
                    },
                    error:function (data) {
                        console.log(data)
                    }
                })
            }
        }
    }
    // 备忘录信息展示
    function displayMemorandum() {
        let html = ""
        html += "<ul class='list-group'>"
        for (let i = 0; i < memorandumData.length; i++) {
            html += "<li class='list-group-item'>"
            html += memorandumData[i].Text
            html += "<button memorandumid='"+memorandumData[i].ID+"' type='button' class='close'>×</button>"
            html += "</li>"
            html += "<p></p>"
        }
        html += "</ul>"
        list_body.innerHTML = html
        // 删除备忘录事件注册
        onDelete(document.getElementsByClassName("close"))
    }

    getMemorandum()

    // 一言展示
    function remark() {
        $.ajax({
            type: "get",
            url: "https://api.uixsj.cn/hitokoto/get",
            success:function(data) {
                remark_body.innerText=data
            }
        })
    }
    remark()

}

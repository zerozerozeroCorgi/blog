window.onload = function() {
    carousel();
    // toTop();

    function carousel() {
        var ul = document.querySelector('.img'),
            index = 1,
            imgWidth = document.querySelector('.img>li').offsetWidth;
        
        window.onresize = function () {
            imgWidth = document.querySelector('.img>li').offsetWidth;
        }
        
        ul.style.transform = "translateX(-" + (index*imgWidth) + "px)";
        var timeId = timeGo();
        ul.addEventListener("transitionend", function () {
            if (index >= 8) {
                index = 1;
                ul.style.transition = "none";
                ul.style.transform = "translateX(-" + (index * imgWidth) + "px)";
            } else if (index <= 0) {
                index = 7;
                ul.style.transition = "none";
                ul.style.transform = "translateX(-" + (index * imgWidth) + "px)";
            }

            // 小圆点索引
            var liIndex = index - 1;
            active(liIndex);
        });

        // 手指右划index--,左划index++
        touch(ul).swipe(function (direction) {
            clearInterval(timeId);
            if (direction == "right") {
                index--;
            } else if (direction == "left") {
                index++;
            }
            ul.style.transition = "transform .3s";
            ul.style.transform = "translateX(-" + (index * imgWidth) + "px)";

            timeId = timeGo();
        });

        function timeGo() {
            return setInterval(function () {
                index++;
                ul.style.transition = "transform .3s";
                ul.style.transform = "translateX(-" + (index*imgWidth) + "px)";
            }, 1000);
        }
        // 小圆点排他
        function active(index) {
            var lis = document.querySelectorAll('.indexer>li');
            for (var i = 0, len = lis.length; i < len; i++) {
                lis[i].classList.remove("active");
            }
            lis[index].classList.add("active");
        }
    }


    function touch(dom) {
        var obj = {
            tap: function (callback) {
            // 按下的坐标
            var startX, startY;
            // 按下的时间
            var startTime;
            // 手指按下
            dom.addEventListener("touchstart", function (e) {
                // 判断手指的个数
                if (e.targetTouches.length > 1) {
                return;
                }

                // 记录按下的坐标
                startX = e.targetTouches[0].clientX;
                startY = e.targetTouches[0].clientY;

                //  console.log(startX,startY);
                // 记录按下的时间
                // Date.now() 和 new date() da.getTime();
                // 返回的是1970 1 1 到现在的 时间戳 
                startTime = Date.now();
                // console.log(startTime);
            })

            // 手指离开
            dom.addEventListener("touchend", function (e) {
                // 判断手指的个数
                if (e.changedTouches.length > 1) {
                return;
                }

                // 离开的坐标
                var endX = e.changedTouches[0].clientX;
                var endY = e.changedTouches[0].clientY;

                // 计算移动了的距离
                if (Math.abs(endX - startX) > 5) {
                return;
                }
                if (Math.abs(endY - startY) > 5) {
                return;
                }

                // 记录离开的时间
                var endTime = Date.now();
                // 毫秒的
                if (endTime - startTime > 200) {
                return;
                }

                // 执行自己tap点击逻辑
                callback(e);
            })
            },
            swipe: function (callback) {
            // 开始的坐标
            var startX, startY;
            var startTime;
            dom.addEventListener("touchstart", function (e) {
                // 判断手指的个数
                if (e.targetTouches.length > 1) {
                return;
                }

                //  记录坐标
                startX = e.targetTouches[0].clientX;
                startY = e.targetTouches[0].clientY;

                // 按下的时间
                startTime = Date.now();


            })

            // 离开
            dom.addEventListener("touchend", function (e) {
                // 判断手指的个数
                if (e.changedTouches.length > 1) {
                return;
                }

                // 记录结束的坐标
                var endX = e.changedTouches[0].clientX;
                var endY = e.changedTouches[0].clientY;

                // 方向
                var direction = "";

                // 判断水平距离
                if (Math.abs(endX - startX) > 15) {
                //  判断方向 
                direction = endX > startX ? "right" : "left";
                } else if (Math.abs(endY - startY) > 15) {
                // 判断方向
                direction = endY > startY ? "down" : "up";
                } else {
                return;
                }

                // 记录结束时间
                var endTime = Date.now();

                if (endTime - startTime > 600) {
                return;
                }

                // 执行逻辑
                // console.log(direction);
                callback(direction);
            })
            }
        };
        return obj;
    }
}
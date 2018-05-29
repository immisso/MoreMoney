let startX = 0;
let startY = 0;
XXX.addEventListener('touchstart', e => {
    startX = e.touches[0].pageX;
    startY = e.touches[0].pageY;
})

XXX.addEventListener('touchmove', e => {
    let endX = e.touches[0].pageX;
    let endY = e.touches[0].pageY;
    let disX = endX - startX;
    let disY = endY - startY;

    //判断滑动的方向
    if (Math.abs(disX) > Math.abs(disY) && disX > 0) {
        console.log("向右边滑动");
    } else if (Math.abs(disX) > Math.abs(disY) && disX < 0) {
        console.log("向左边滑动");
    } else if (Math.abs(disX) < Math.abs(disY) && disY < 0) {
        console.log("向上边滑动");
    } else if (Math.abs(disX) < Math.abs(disY) && disY > 0) {
        console.log("向下边滑动")
    }

})
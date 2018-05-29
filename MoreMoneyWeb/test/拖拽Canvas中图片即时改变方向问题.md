### 拖拽Canvas中图片即时改变方向的问题

有时候，我们需要对Canvas中的图片进行拖拽，尤其是HTML5游戏以及微信小游戏中常常会遇到。正常情况下我们给对象添加touchmove就可以现实拖拽。但是有时候我们需要判定拖拽方向，在不连续的情况下我们一般会结合touchstart,touchmove,touchend再根据坐标来判断方向。


#### 1.1 不连续情况下的拖拽

不连续情况下的拖拽（滑动）比如说：左右滑动翻页;我们会以这样的方式判断方向

```javascript
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
```

###1.2 连续情况下的拖拽

上面的方法是通过起点以及末点的位置来判定的，但是往往我们不知道末点，或者我们需要随着拖拽的方向而改变对应对象的方向的时候，上面的方法就不再实用了。因为上面的方法只有结束了拖拽知道了末点才能判定方向。


>例如：我们有两张图片图片1和图片2，图片1指向右边，图片2指向左边，我们希望在Canvas上实现，拖动图片，当我们往右边拖动的时候，拖动的图片对象指向右边，往左边拖动的时候指向左边。拖拽方向即时该改变，图片方向也即时改变如下效果图

下面即为实现的源码
html 代码
```html
    <body>
        <canvas id='test_canvas'></canvas>
    </body>
```

js代码

```javascript
    
    const canvas = document.getElementById('test_canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = screen.width;
    canvas.height = screen.height;
    let startX = 0;
    let startY = 0;

    const image = new Image();
    image.src = "../res/left_64.png";
    image.onload = function() {
        console.log("图片加载成功");
        ctx.drawImage(image, 0, 0, image.width, image.height, startX, startY, image.width, image.height);
    };

    canvas.addEventListener('touchmove', e => {
        e.preventDefault();

        let X = e.touches[0].pageX;
        let Y = e.touches[0].pageY;

        let disX = X - startX;
        let disY = Y - startY;
        if (Math.abs(disX) > Math.abs(disY) && disX > 0) {
            image.src = "../res/right_64.png";
        } else if (Math.abs(disX) > Math.abs(disY) && disX < 0) {
            image.src = '../res/left_64.png';
        }

        if (X < 0) {
            X = 0;
        } else if (X > canvas.width - image.width) {
            X = canvas.width - image.width;
        }

        if (Y < 0) {
            Y = 0;
        } else if (Y > canvas.height - image.height) {
            Y = canvas.height - image.height;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0, image.width, image.height, X, Y, image.width, image.height);
        startX = X;
        startY = Y;
    })
   
```

这种方法其实原理和1.1的类似，唯一的区别就是我们不停得更换起始点，保存这一次的结束点，作为下次的起始点，这样，就最大化的确定了方向，这样就更加的精准的变换了方向。




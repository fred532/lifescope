var slider = {
    startingMousePostition: {},
    containerOffset: {},
    init: function(){
        window.addEventListener('mousedown', function(event){
            slider.startingMousePostition = {
                x: event.clientX,
                y: event.clientY
            };
            slider.containerOffset = {
                x: life.$el.scrollLeft,
                y: life.$el.scrollTop
            };
            window.addEventListener('mousemove', slider.slide);
        });
        window.addEventListener('mouseup', function(event){
            window.removeEventListener('mousemove', slider.slide);
        });
    },
    slide: function(event){
        event.preventDefault();
        var x = slider.containerOffset.x + (slider.startingMousePostition.x - event.clientX);
        var y = slider.containerOffset.y + (slider.startingMousePostition.y - event.clientY);
        life.$el.scrollLeft = x;
        life.$el.scrollTop = y;
    }
};

slider.init();
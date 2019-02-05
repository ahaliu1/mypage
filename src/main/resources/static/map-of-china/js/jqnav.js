$(document).ready(function(){
    maphover();
});

function maphover(){
    var self = "";
    var travelled=0;
    $(".city").hover(

        function(){
            self = $(this);
            if (self.children("div").css("display")==="none"){
                travelled=1;
            }
            self.addClass("hover").children("div").hide();
        },
        function(){
            self = $(this);
            if (travelled==0){
                self.children("div").show();
                self.removeClass("hover");
            }else {
                travelled=0
            }
        }
    );
    $(".city").click(
        function(){
            self = $(this);
            self.addClass("hover").children("div").hide();
        },
        function(){
            self = $(this);
            self.children("div").show();
            self.removeClass("hover");
        }
    );

};

(function ($) {
$.fn.dylanCarousel = function (options) {
	var settings = $.extend({
	    circular: true,
	    pageNo: 0,
	    pageSize: 1,
	    pageWidth: 0,
	    item: "li",
	    padding: 10,
	    node: {
	        nextBtn: ".next-btn",
	        prevBtn: ".prev-btn",
	        pageNo: "",
	        totalPage: ""
	    },
	    auto: false
	}, options);
	function toNext($this) {

	    var settings = $this.data("dc-conf");
	    
	    settings.pageNo++;
	    if (settings.pageNo*settings.pageSize >= settings.itemLength) { // from page N to page 0
	    	var elements = $this.find(settings.item);
	    	for(var i=0,max=settings.pageSize; i<max; i++) {
	    		$this.append(elements.eq(i).clone());
	    	}
		    settings.pageNo = 0;
		    $this.data("dc-conf", settings);

		    $this.animate({
		    	'left': '-=' + settings.pageWidth + "px"
		    }, 500, function() {
		    	$this.css('left', '0');
		    	for(var i=0,max=settings.pageSize; i<max; i++) {
		    		$this.find(settings.item).last().remove();
		    	}
		    });
		    
	    }
	    else { // from page N to page N+1
	    	$this.data("dc-conf", settings);
		    $this.animate({
		    	'left': '-=' + settings.pageWidth + "px"
		    }, 500);
	    	
	    }

	    refreshPageNo($this);
	}
	function clickNext() {
	    var $this = $($(this).data("area"));
	    var settings = $this.data("dc-conf");

	    clearInterval(settings.interval);
	    
	    toNext($this);
	}
	function clickBack() {
		var $this = $($(this).data("area"));
	    var settings = $this.data("dc-conf");
	    
	    clearInterval(settings.interval);
	    
	    settings.pageNo--;
	    if (settings.pageNo == -1) { // from page 0 to page N
	    	
	    	var elements = $this.find(settings.item);
	    	for(var i=0,max=settings.pageSize; i<max; i++) {
	    		$this.prepend(elements.eq(settings.itemLength-1-i).clone());
	    	}
	    	$this.css('left', -settings.pageWidth + 'px');
		    settings.pageNo = Math.floor(settings.itemLength/settings.pageSize+0.000001)-1;
		    $this.data("dc-conf", settings);

		    $this.animate({
		    	'left': '+=' + settings.pageWidth + "px"
		    }, 500, function() {
		    	for(var i=0,max=settings.pageSize; i<max; i++) {
		    		$this.find(settings.item).first().remove();
		    	}
		    	$this.css('left', -1 * (settings.pageWidth * settings.pageNo) );
		    });
		    
	    }
	    else { // from page N to page N-1
	    	$this.data("dc-conf", settings);
		    $this.animate({
		    	'left': '+=' + settings.pageWidth + "px"
		    }, 500);
	    }
	    refreshPageNo($this);
	}
	function refreshPageNo($this) {
		var settings = $this.data('dc-conf');
		
		var totalPage = Math.floor(settings.itemLength/settings.pageSize+0.000001);
		var pageNo = +settings.pageNo+1;
		$(settings.node.pageNo).text(pageNo);
		$(settings.node.totalPage).text(totalPage);
	}
 	this.each(function () {
        var $this = $(this);

        settings.itemLength = $this.find(settings.item).length;
        if(settings.pageWidth == 0) {
        	settings.pageWidth = $this.parent().width();
        }
    	$this.css("width", (settings.itemLength+settings.pageSize) * ($this.find(settings.item).width()+settings.padding) );
        $this.css("left", '0');
        
        if(settings.itemLength <= settings.pageSize) {
            $(settings.button.next + "," + settings.button.prev).hide();
        }
        $(settings.node.nextBtn).bind("click", clickNext).data("area", $this);
        $(settings.node.prevBtn).bind("click", clickBack).data("area", $this);
       
        if(settings.auto) {
        	settings.interval = setInterval(function() {
        		toNext($this);
        	}, 1000*10);
        }

        $this.data("dc-conf", settings);

        refreshPageNo($this);
    });
}
})(jQuery);
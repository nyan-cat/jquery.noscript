(function($)
{
    $.fn.dataEvents = function()
    {
        return this.data("events") || "click";
    };

    $.fn.dataDuration = function(value)
    {
        var value = typeof value !== "undefined" ? value : 0;
        return this.data("duration") || value;
    };

    $.noscript = function(data, handler)
    {
        this.selectors = [];

        var selector = "*[data-" + data + "]";
        this.selectors.push(selector);

        $(selector).each(function()
        {
            var self = $(this);
            self.on(self.dataEvents(), function(e)
            {
                handler(self, $(self.data(data.toLowerCase())));
                e.preventDefault();
            });
        });
    };
})(jQuery);

$(document).ready(function()
{
    var handlers =
    {
        fadeIn : function(self, target)
        {
            $(target).fadeIn(self.dataDuration(400));
        },

        fadeOut : function(self, target)
        {
            $(target).fadeOut(self.dataDuration(400));
        },

        fadeTo : function(self, target)
        {
            $(target).fadeTo(self.dataDuration(400), self.data("opacity"));
        },

        fadeToggle : function(self, target)
        {
            $(target).fadeToggle(self.dataDuration(400));
        },

        finish : function(self, target)
        {
            $(target).finish();
        },

        hide : function(self, target)
        {
            $(target).hide(self.dataDuration());
        },

        href : function(self, target)
        {
            window.location = target;
        },

        load : function(self, target)
        {
            $(target).load(self.data("url"));
        },

        show : function(self, target)
        {
            $(target).show(self.dataDuration());
        },

        submit : function(self, target)
        {
            $(target).submit();
        },

        slideDown : function(self, target)
        {
            $(target).slideDown(self.dataDuration());
        },

        slideToggle : function(self, target)
        {
            $(target).slideToggle(self.dataDuration());
        },

        slideUp : function(self, target)
        {
            $(target).slideUp(self.dataDuration());
        },

        toggle : function(self, target)
        {
            $(target).toggle(self.dataDuration());
        },

        toggleClass : function(self, target)
        {
            $(target).toggleClass(self.data("class"));
        },

        trigger : function(self, target)
        {
            $(target).trigger(self.data("event"));
        }
    };

    function eachOn()
    {
        $.each(handlers, function(index, value)
        {
            $.noscript(index, value);
        });
    }

    function eachOff()
    {
        $.each($.noscript.selectors, function(index, value)
        {
            var self = $(value);
            self.off(self.dataEvents());
        });

        $.noscript.selectors = [];
    }

    $(document).ajaxComplete(function()
    {
        eachOff();
        eachOn();
    });

    eachOn();
});
(function($) {
    $('.ui-accordion-header').click(function () {
        $(this).parent().find('.ui-accordion-content').addClass('folded');
        $(this).next().removeClass('folded');
    });
    var HelloWorldDevs = function() {

    };

    HelloWorldDevs.prototype.mailForm = function (form, uid) {
        var $form = $(form);
        $form.before('<div class="form-error"></div>');
        $form.submit(function(e) {
            e.preventDefault();
            var formData = $form.serialize();
            var formAction = 'http://web-api.tysonsteele.com/v1/webprops/'+uid+'/schedule';
            $.ajax({
                type: 'POST',
                url: formAction,
                data: formData,
                dataType: 'json',
                encode: true
            }).done(function (response) {
                $('.form-error').remove();
                $form.replaceWith('Congratulations! Dentistry is a big part of a \
	            healthy life, and we\'re excited to be a part of yours. We will \
	            contact you in the next 2 business days to schedule your \
	            appointment and to answer any questions you may still have. \
	            Thank you!');
            }).error(function (response) {
                var $error_list = $('<ul></ul>');
                $.each(response.responseJSON, function(key, value) {
                    $error_list.append('<li>'+value+'</li>');
                });
                $('.form-error').html($error_list).fadeIn();
            });
        });
    };
    var HWD = new HelloWorldDevs();

    HWD.mailForm('#mail-form', '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!Uid Goes Here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

})(jQuery);

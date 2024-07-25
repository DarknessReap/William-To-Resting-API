$(document).ready(function() {
    $('#search').on('click', function() {
        var term = $('#term').val();
        if (term) {
            $.ajax({
                url: 'https://api.datamuse.com/words',
                type: 'GET',
                data: {
                    rel_syn: term
                },
                success: function(response) {
                    console.log(response); // Log the response for debugging
                    
                    var synonyms = [];

                    if (response.length > 0) {
                        response.forEach(function(item) {
                            synonyms.push(item.word);
                        });

                        var synonymsHtml = '<strong>Synonyms:</strong> ' + synonyms.join(', ');
                        $('#definition').html(synonymsHtml);
                    } else {
                        $('#definition').html('No synonyms found.');
                    }
                },
                error: function() {
                    $('#definition').text('Error retrieving synonyms.');
                }
            });
        } else {
            $('#definition').text('Please enter a term.');
        }
    });
});

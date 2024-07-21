$(document).ready(function() {
    $('#search').on('click', function() {
        var term = $('#term').val();
        if (term) {
            $.ajax({
                url: 'https://mashape-community-urban-dictionary.p.rapidapi.com/define',
                type: 'GET',
                data: { term: term },
                headers: {
                    'X-RapidAPI-Key': 'qq6oJtDbyfnXNmNZog7etxOk857bDaHrFksphcbX',
                    'X-RapidAPI-Host': 'mashape-community-urban-dictionary.p.rapidapi.com'
                },
                success: function(response) {
                    if (response.list && response.list.length > 0) {
                        $('#definition').text(response.list[0].definition);
                    } else {
                        $('#definition').text('No definition found.');
                    }
                },
                error: function() {
                    $('#definition').text('Error retrieving definition.');
                }
            });
        } else {
            $('#definition').text('Please enter a term.');
        }
    });
});

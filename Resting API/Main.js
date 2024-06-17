$(document).ready(function() {
    $('#search').on('click', function() {
        var term = $('#term').val();
        if (term) {
            $.ajax({
                url: 'https://mashape-community-urban-dictionary.p.rapidapi.com/define',
                type: 'GET',
                data: { term: term },
                headers: {
                    'X-RapidAPI-Key': '1f05a6bed0msh0358b1e81fd9cf9p1e3786jsn63dec353bef9',
                    'X-RapidAPI-Host': 'urban-dictionary7.p.rapidapi.com'
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

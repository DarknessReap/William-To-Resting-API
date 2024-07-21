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
$(document).ready(function() {
    $('#search').on('click', function() {
        var term = $('#term').val();
        if (term) {
            $.ajax({
                url: 'https://www.dictionaryapi.com/api/v3/references/thesaurus/json/' + term,
                type: 'GET',
                data: { key: 'qq6oJtDbyfnXNmNZog7etxOk857bDaHrFksphcbX' },
                success: function(response) {
                    if (response.length > 0 && response[0].meta) {
                        $('#definition').html('<strong>' + response[0].hwi.hw + ':</strong> ' + response[0].shortdef[0]);
                        if (response[0].meta.syns && response[0].meta.syns.length > 0) {
                            $('#definition').append('<br><strong>Synonyms:</strong> ' + response[0].meta.syns[0].join(', '));
                        }
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

$(document).ready(function() {
    const dictionaryApiKey = 'b6811f43-e4ab-4ead-a29c-3067a77dc7e6';  // Dictionary API Key
    const thesaurusApiKey = '93a1146c-7f40-4b7b-b610-2ba812a1c39d';  // Thesaurus API Key

    $('#search').on('click', function() {
        var term = $('#term').val().trim();
        var searchType = $('#search-type').val();  // Get the selected search type
        var apiKey = searchType === 'dictionary' ? dictionaryApiKey : thesaurusApiKey;
        var reference = searchType === 'dictionary' ? 'collegiate' : 'sd3';  // Update the reference based on type
        var apiUrl = `https://www.dictionaryapi.com/api/v3/references/${reference}/json/${term}?key=${apiKey}`;

        if (term) {
            $.ajax({
                url: apiUrl,
                type: 'GET',
                success: function(response) {
                    console.log('API Response:', response); // Log the full response

                    if (response.length > 0 && typeof response[0] === 'object') {
                        if (searchType === 'dictionary') {
                            var definition = response[0].shortdef ? response[0].shortdef[0] : 'No definition found.';
                            $('#definition').html(`<strong>Definition:</strong> ${definition}`);
                        }

                        if (searchType === 'thesaurus') {
                            var synonyms = response[0].meta && response[0].meta.syns ? response[0].meta.syns[0].join(', ') : 'No synonyms found.';
                            var resultHtml = `<strong>Synonyms:</strong> ${synonyms}`;
                            $('#definition').html(resultHtml);
                        }
                    } else {
                        $('#definition').html('No results found.');
                    }
                },
                error: function() {
                    $('#definition').text('Error retrieving information.');
                }
            });
        } else {
            $('#definition').text('Please enter a term.');
        }
    });
});

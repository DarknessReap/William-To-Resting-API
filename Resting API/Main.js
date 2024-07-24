$(document).ready(function() {
    $('#search').on('click', function() {
        var term = $('#term').val();
        if (term) {
            var apiKeys = [
                '729bc70b-040d-4073-91c8-482b3cc5a9d2',
                '6d2bab34-586e-4a77-ab08-57fcbb037b11'
            ];

            var promises = apiKeys.map(function(key) {
                return $.ajax({
                    url: 'https://www.dictionaryapi.com/api/v3/references/thesaurus/json/' + term,
                    type: 'GET',
                    data: { key: key }
                });
            });

            Promise.all(promises)
                .then(function(responses) {
                    var definitions = [];
                    var synonyms = [];

                    responses.forEach(function(response) {
                        if (response.length > 0) {
                            var entry = response[0];

                            if (entry.hwi && entry.hwi.hw) {
                                definitions.push('<strong>' + entry.hwi.hw + ':</strong>');
                            }

                            if (entry.shortdef && entry.shortdef.length > 0) {
                                definitions.push(entry.shortdef[0]);
                            }

                            if (entry.meta && entry.meta.syns && entry.meta.syns.length > 0) {
                                synonyms.push(entry.meta.syns[0].join(', '));
                            }

                            if (entry.def && entry.def.length > 0) {
                                entry.def.forEach(function(defEntry) {
                                    if (defEntry.sseq && defEntry.sseq.length > 0) {
                                        defEntry.sseq.forEach(function(sseqEntry) {
                                            var sense = sseqEntry[0][1];
                                            if (sense.dt && sense.dt.length > 0) {
                                                sense.dt.forEach(function(dtEntry) {
                                                    if (dtEntry[0] === 'text') {
                                                        definitions.push('<br><strong>Definition:</strong> ' + dtEntry[1]);
                                                    }
                                                });
                                            }

                                            if (sense.syn_list && sense.syn_list.length > 0) {
                                                var additionalSyns = sense.syn_list[0].map(function(syn) { return syn.wd; });
                                                synonyms.push('<br><strong>Additional Synonyms:</strong> ' + additionalSyns.join(', '));
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    });

                    var definitionHtml = definitions.length > 0 ? definitions.join('<br>') : 'No definition found.';
                    var synonymsHtml = synonyms.length > 0 ? synonyms.join('<br>') : '';

                    $('#definition').html(definitionHtml + (synonymsHtml ? '<br>' + synonymsHtml : ''));
                })
                .catch(function() {
                    $('#definition').text('Error retrieving definition.');
                });
        } else {
            $('#definition').text('Please enter a term.');
        }
    });
});

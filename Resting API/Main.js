$(document).ready(function() {
    $('#search').on('click', function() {
        var term = $('#term').val();
        if (term) {
            $.ajax({
                url: 'https://www.dictionaryapi.com/api/v3/references/thesaurus/json/' + term,
                type: 'GET',
                data: { key: '6d2bab34-586e-4a77-ab08-57fcbb037b11' },
                success: function(response) {
                    console.log(response);
                    var definitionHtml = '';

                    if (response.length > 0) {
                        var entry = response[0];

                        if (entry.hwi && entry.hwi.hw) {
                            definitionHtml += '<strong>' + entry.hwi.hw + ':</strong> ';
                        }

                        if (entry.shortdef && entry.shortdef.length > 0) {
                            definitionHtml += entry.shortdef[0];
                        }

                        if (entry.meta && entry.meta.syns && entry.meta.syns.length > 0) {
                            definitionHtml += '<br><strong>Synonyms:</strong> ' + entry.meta.syns[0].join(', ');
                        }

                        if (entry.def && entry.def.length > 0) {
                            entry.def.forEach(function(defEntry) {
                                if (defEntry.sseq && defEntry.sseq.length > 0) {
                                    defEntry.sseq.forEach(function(sseqEntry) {
                                        var sense = sseqEntry[0][1];
                                        if (sense.dt && sense.dt.length > 0) {
                                            sense.dt.forEach(function(dtEntry) {
                                                if (dtEntry[0] === 'text') {
                                                    definitionHtml += '<br><strong>Definition:</strong> ' + dtEntry[1];
                                                }
                                            });
                                        }

                                        if (sense.syn_list && sense.syn_list.length > 0) {
                                            var syns = sense.syn_list[0].map(function(syn) { return syn.wd; });
                                            definitionHtml += '<br><strong>Additional Synonyms:</strong> ' + syns.join(', ');
                                        }
                                    });
                                }
                            });
                        }
                    } else {
                        definitionHtml = 'No definition found.';
                    }

                    $('#definition').html(definitionHtml);
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

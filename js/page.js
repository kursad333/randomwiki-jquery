$(document).ready(function () {
  updateTopicCount();

  $('#js-btn-search').click("click", function(){
    fetchRandomPage();
  })

  function updateTopicCount() {
    const endpoint =
      "https://en.wikipedia.org/w/api.php?action=query&meta=siteinfo&siprop=statistics&format=json&origin=*";
    $.getJSON(endpoint, function (json) {
      const pagecount = json.query.statistics.pages;

      $({ Counter: 0 }).animate({
        Counter: pagecount
      }, {
        duration: 500,
        easing: 'swing',
        step: function() {
          $('.js-topic-count').text(Math.ceil(this.Counter));
        }
      });
    });
  }

  async function fetchRandomPage(){
    const page_endpoint = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0&prop=extracts|info&exintro&inprop=url&origin=*&formatversion=2&exintro'
    await $.getJSON(page_endpoint, function (json){
      const title = json.query.pages[0].title;
      const extract = json.query.pages[0].extract;
      const permalink = json.query.pages[0].fullurl

      $('.js-wiki-title').empty().html(title);
      $('.js-wiki-content').empty().html(extract);
      $('.js-footer-text').empty().append(`<p >Did you find <b>'${title}'</b> interesting?</p>`);
      $('.js-footer-button').empty().append(`<a class="btn btn-lg btn-readmore" href="${permalink}" target="blank">Read more..</button>`);

      $('#js-btn-search').empty().html("Again")
      
    })
    
  }
});

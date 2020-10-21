$(document).ready(function () {
    console.log("ready!");
    $("#btn-search").click(testjson)
    function testjson(){
      $.getJSON("api-result2.json", function (json){
          console.log(json.query.pages[0].extract)
          $('.page-content').html(json.query.pages[0].extract)
      })
    }
  
    async function searchRandomWiki(){
      const api = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=banking&formatversion=2&rvprop=content&rvslots=*'
      const response = await fetch(endpoint)
    }
  
    async function searchWikipedia(searchQuery) {
      const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
      const response = await fetch(endpoint);
  
      if (!response.ok) {
        throw Error(response.statusText);
      }
  
      const json = response.json();
      return json;
    }
  
    
    async function handleSubmit(event) {
      // alert("je hoort hier niet te zijn ga weg");
      const searchQuery = "aapje"
      console.log(searchQuery);
  
      try {
        const results = await searchWikipedia(searchQuery);
        console.log(results);
      } catch (err) {
        console.log(err);
      }
    }
    async function fetchRandomPageID() {
        const listcount = 5;
        var page_id = 0;
    
        const random_endpoint = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnnamespacee=*&rnfilterredir=nonredirects&rnlimit=${listcount}&origin=*&ns=14`;
        await $.getJSON(random_endpoint, function (json) {
          const random_id = Math.floor(Math.random() * listcount + 1);
          page_id = json.query.random[random_id].id;
        });
        return page_id;
      }
  
  });
  
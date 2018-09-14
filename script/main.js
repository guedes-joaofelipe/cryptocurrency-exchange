
let market
let coinsList = []
let coinsName = []

$('.button-refresh').click(refreshData)
refreshData();

getCoinList();

function getCoinList() {
    $.get('/coinList.json', function(data){
        coinsList = data;
    }).done(
        () => {
            console.log(coinsList)
            // coinsList.forEach(value => {
            //     const coin = {
            //         name: value.FullName,
            //         img: 'https://www.cryptocompare.com' + coin.ImageUrl
            //     }

            //     coinsName.append(coin);
            // })
        }
    )
}

getBitcoinFees();

function getBitcoinFees() {
    $.get('https://bitcoinfees.earn.com/api/v1/fees/recommended', function(data) {
        fees = data;
    }). done (
        () => {
            console.log(fees);
            $('#highFee').text('High: ' + fees.fastestFee);
            $('#mediumFee').text('Medium: ' + fees.halfHourFee);
            $('#lowFee').text('Low: ' + fees.hourFee);
        }
    )
}

function refreshData() {
    $.get('https://api.cryptonator.com/api/full/btc-usd', function(data) {
        market = data;
    }).done (
        () => {
            fillExchangeTable(market.ticker.markets);
            $('.last-updated').text(
                'Last Updated: ' + new Date().toLocaleString()
            )
        }
    )
}


function getRecommendedMarket() {
    return "YoBit";
}

function sortMarketTable(table, column, order) {


    var filteredColumn = [];
    table.map(
        (res) => {
            filteredColumn.push(res[column]);
        } 
    );

    if (order === "asc") {
        filteredColumn.sort();
    } else {
        filteredColumn.reverse();
    }
    
    var sortedMarketTable = [];

    table.filter(x => x[column] == filteredColumn);

    console.log(filteredColumn);

    // for (var row in table) {
    //     filteredColumn.push(table[column]);
    // }


}



function fillExchangeTable(market) {

    $('.table').empty();
    let table = $('.table');
    
    let lineTitle = $("<tr>");
    let titleMarket = $("<th>").text("Market");
    let titlePrice = $("<th>").text("Price");
    let titleVolume = $("<th>").text("Volume");

    lineTitle.append(titleMarket);
    lineTitle.append(titlePrice);
    lineTitle.append(titleVolume);

    table.append(lineTitle);

    let recommendedMarket = getRecommendedMarket();


    sortMarketTable(market, "market", "desc");
    console.log(recommendedMarket);
    //console.log(market);

    market.forEach(data => {

        let line = $("<tr>");

        let columnMarket = $("<td>").text(data.market);
        let columnPrice = $("<td>").text(parseFloat(data.price).toFixed(2));
        let columnVolume = $("<td>").text(parseFloat(data.volume).toFixed(2));

        line.append(columnMarket);
        line.append(columnPrice);
        line.append(columnVolume);
        table.append(line);
    });

}
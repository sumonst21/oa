// -----------------------------------------------------------------------------
//! DraftKings
// -----------------------------------------------------------------------------

var g = [];
var rows = document.querySelectorAll('.sportsbook-table__body tr');
var used = [];

for (var i = 0; i < rows.length; i++) {
    var odds = rows[i].querySelector('td:last-child .sportsbook-odds') ? rows[i].querySelector('td:last-child .sportsbook-odds').innerText.replace('+', '') : 0;
    var name = rows[i].querySelector('.event-cell__name-text').innerHTML.split('<')[0];
    var shortName = name.substring(name.indexOf(' ') + 1);
    if ( rows[i].querySelector('.sportsbook__icon--live') ) {
        odds = 0;
    }
    if ( used.indexOf(shortName) > -1 ) {
        shortName += ' G2';
    }

    // New game
    if ( i % 2 !== 1 ) {
        g.push({
            team: shortName,
            odds: [ odds ]
        });
    } else {
        g[g.length - 1].opp = shortName;
        g[g.length - 1].odds.push( odds );
    }

    used.push(shortName);
}


// -----------------------------------------------------------------------------
//! FanDuel
// -----------------------------------------------------------------------------

var g = [];
var events = document.querySelectorAll('.event');
var used = [];

for (var i = 0; i < events.length; i++) {
    var names = events[i].querySelectorAll('.event-info .name');
    var oddsA = events[i].querySelectorAll('.market.money .selectionprice')[0].innerText.replace('+', '');
    var oddsB = events[i].querySelectorAll('.market.money .selectionprice')[1].innerText.replace('+', '');

    if ( !events[i].querySelector('.live-box') ) {
        var team = names[0].innerText.substring(names[0].innerText.indexOf(' ') + 1);
        var opp = names[1].innerText.substring(names[1].innerText.indexOf(' ') + 1);

        if ( used.indexOf(team) > -1 ) {
            team += ' G2';
            opp += ' G2';
        }

        g.push({
            team: team,
            opp: opp,
            odds: [ oddsA, oddsB ],
        });

        used.push(team);
    }
}


// -----------------------------------------------------------------------------
//! DraftKings - MMA
// -----------------------------------------------------------------------------

var g = [];
var rows = document.querySelectorAll('.game-props-card17');

for (var i = 0; i < rows.length; i++) {
    var team = rows[i].querySelector('li:first-child .sportsbook-outcome-cell__label').innerText;
    var opp = rows[i].querySelector('li:last-child .sportsbook-outcome-cell__label').innerText;
    var oddsA = rows[i].querySelector('li:first-child .sportsbook-odds').innerText.replace('+', '');
    var oddsB = rows[i].querySelector('li:last-child .sportsbook-odds').innerText.replace('+', '');

    g.push({
        team: team,
        opp: opp,
        odds: [oddsA, oddsB]
    });
}

// -----------------------------------------------------------------------------
//! FanDuel - MMA
// -----------------------------------------------------------------------------

var g = [];
var rows = document.querySelectorAll('.selections-container');

for (var i = 0; i < rows.length; i++) {
    var team = rows[i].querySelector('.selection:first-child .selection-name').innerText;
    var opp = rows[i].querySelector('.selection:last-child .selection-name').innerText;
    var oddsA = rows[i].querySelector('.selection:first-child .selectionprice').innerText.replace('+', '');
    var oddsB = rows[i].querySelector('.selection:last-child .selectionprice').innerText.replace('+', '');

    g.push({
        team: team,
        opp: opp,
        odds: [oddsA, oddsB]
    });
}

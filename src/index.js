import CloudTablesApi from 'cloudtables-api';
import Combobox from './Components/Combobox/Combobox.js';
import timeSeries from './data/time-series.js';
import categories from './data/categories.js';
import params from './data/params.js';
import foods from './data/foods.js';
import Sparkline from 'sparklines';

// CSS
import normalize from './css/normalize.css';
import postmedia from './css/postmedia.css';
import colours from './css/colors.css';
import fonts from './css/fonts.css';
import css from './css/main.css';
import cloudtable from'./css/cloudtable.css';

// FONTS
import'./fonts/Shift-Bold.otf';
import'./fonts/Shift-BoldItalic.otf';
import'./fonts/BentonSansCond-Regular.otf';
import'./fonts/BentonSansCond-RegItalic.otf';
import'./fonts/BentonSansCond-Bold.otf';


// VARS
let server;
let serverPool;
const sparklineOptions = {
    dotRadius: 4,
    endColor: '#0062A3',
    height: 25,
    lineColor: '#0062A3',
    width: 125,
    tooltip: function(value, index, array) {
        console.log(value)
    }
};

// JS FUNCTIONS
const init = async () => {
    server = params.cloudTableDomain;

    // create dynamic list of options for comboboxes
    createComboBox(categories, '#combobox', '🍽️ All food groups 🍽️');

    // create combobox filter for data
    $(document).on('change', '#combobox', comboboxChangeHandler);
    Combobox('#combobox');

    // custom search box
    addSearchBox();

    // load the unfiltered cloudtable
    loadCloudTable('');

    // add sparklines
    addSparklines(timeSeries);
};
function addSearchBox() {
    // wait for ct
    document.addEventListener('ct-ready', e => {
        const ct = e.table;
        const table = ct.table();

        //  Create the input element above the table
        const container = table.table().container();
        const searchBox = document.createElement('input');
        searchBox.className = 'searchbox';
        searchBox.type = 'text';
        searchBox.placeholder = 'Lookup a food...';
        container.parentNode.insertBefore(searchBox, container);

        // On draw, hide rows that don’t match the search term
        table.on('draw', () => {
            const searchTerm = searchBox.value.trim().toLowerCase();

            table.rows().every(function() {
                const rowData = this.data();
                let match = true;

                if (searchTerm) {
                    try {
                        const productArray = JSON.parse(rowData['dp-119']);
                        const productText = productArray[0].text.toLowerCase();
                        match = productText.includes(searchTerm);
                    } catch (e) {
                        match = false;
                    }
                }

                // Hide or show the row
                $(this.node()).toggle(match);
            });
        });

        // Add input event listener to filter the table
        searchBox.addEventListener('input', () => {
            // const val = searchBox.value;
            // table.column(productColIndex).search(val).draw();
            table.draw()
            // console.log(val)
        });
    });
}

function addSparklines(timeSeries) {
    // wait for ct
    document.addEventListener('ct-ready', e => {
        const ct = e.table;
        const table = ct.table();

        // wait for the table data to load
        table.on('draw', () => {
            // loop through all rows & print products column
            table.rows().every(function() {
                const product = JSON.parse(this.data()['dp-119'])[0].text;
                const timeseries = this.data()['dp-128'];

                // Find the matching time series
                const data = timeSeries.find(d => d.item === product);

                // find the column index by datapoint ID
                const chartIndex = table.columns().indexes().filter(i => table.column(i).dataSrc() === 'dp-128')[0];
                const cell = this.cell(this.index(), chartIndex).node();

                // Add div to cell for sparkline
                if (data) {
                    const id = `${product.toLowerCase().replaceAll(' ', '-')}-container`;
                    const span = document.createElement('div');
                    span.setAttribute('id', id);  // optional
                    cell.appendChild(span);
                    
                    drawSparkline(id, data.data);
                }
                    
            });
        });
    });
}

// super-hack "load balancer"
function assignServer(serverPool) {
    let server;
    // const date = new Date();
    // const current_min = date.getMinutes();

    // if (current_min % 2 == 0) {
    //     server = params.cloudTableDomain;
    // } else {
    //     server = params.cloudTableDomain_v2;
    // }
    if (serverPool.length == 0) {
        // re-assign server pool & pull sever from pool
    } else {
        // pull server from pool
        server = serverPool.pop();
    }

    // return server
    return server;
}

function comboboxChangeHandler(e) {
    console.log('COMBO')
    // reset container dom element
    $('.cloudtables')[0].textContent = '';

    // strip the emojis
    const category = e.target.value.slice(4);

    // reload the table with selected agency filtered
    const filterValue = e.target.value === '🍽️ All food groups 🍽️' ? null : category;

    // create filter condition for the "dp-119" column
    let conditions = filterValue ? [{ id: params.categoryId, value: filterValue }] : null;

    // reload table
    loadCloudTable(filterValue, conditions);
}

function createComboBox(data, el, label) {
    let string = '';

    // sort our list
    const list = data.sort();
    list.unshift(label);

    list.forEach(d => {
        string += `<option value='${d}'>${d}</option>`;
    });
    
    $(el).append(string);
}

function drawSparkline(id, data) {
    const sparkline = new Sparkline(document.getElementById(id), sparklineOptions);
    sparkline.draw(data);
}

async function loadCloudTable(filterValue, conditionsArray) {
    // if the filter has been selected, filter for those options, otherwise show everything (null)
    let conditions = filterValue ? conditionsArray : null;

    // grab the ct api instance
    let api = new CloudTablesApi(params.apiKey, {
        clientName: params.clientId,     // Client's name - optional
        domain: server,                 // CloudTables host
        conditions: conditions      // Use this to filter table
    });


    // console.log(`https://${server}/io/loader/${params.cloudTableId}/table/d`)
    // get a cloudtables api token
    let token = await api.token();
    // build the script tag for the table
    let script = document.createElement('script');
    script.src = `https://${server}/io/loader/${params.cloudTableId}/table/d`;
    script.setAttribute('data-token', token);
    script.setAttribute('data-insert', params.tableId);
    script.setAttribute('data-clientId', params.clientId);


    // insert the script tag to load the table
    let app = document.getElementById(params.appId).appendChild(script);
}

// KICK *SHT OFF!!!
init();
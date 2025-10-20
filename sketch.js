let table;


function preload() {
  // put preload code here
  table = loadTable("dataset.csv", "csv", "header");
}

function setup() {
  //controllo se ho caricato i dati
  console.log(table);

  let outerPadding = 20;
  let padding = 10;
  let itemSize = 30;

  //calcolo il numero delle colonne
  let cols = floor((windowWidth - outerPadding * 2)/(itemSize + padding));

  let rows = ceil(table.getRowCount() / cols);

  let totalHeight = outerPadding * 2 + rows * itemSize + (rows - 1) * padding;

  //creo il canvas
  createCanvas(windowWidth, totalHeight);
  background("beige");

  console.log('cols', cols, 'rows', rows);

  let colCount = 0;
  let rowCount = 0;
  
  for(let rowNumber = 0; rowNumber < table.getRowCount(); rowNumber ++){
    
    //carico i dati dalla tabella
    let data = table.getRow(rowNumber).obj;

    //prendo valore per dimensione
    let myValue = data['column1'];

    //calcolo min e max
    let allValues = table.getColumn("column1");
    let minValue = min(allValues);
    let maxValue = max(allValues);

    let scaledValue = map(myValue, minValue, maxValue, 1, itemSize);

    //seconda variabile per il colore
    let value2 = data['column3'];
    let allValues2 = table.getColumn('column3');
    let minValue2 = min(allValues2);
    let maxValue2 = max(allValues2);
    let value2Mapped = map(value2, minValue2, maxValue2, 0, 1);

    let c1 = color('brown');
    let c2 = color('green');

    let mappedColor = lerpColor(c1, c2, value2Mapped);

    fill(mappedColor);

    let xCenter = outerPadding + colCount * (itemSize + padding) + itemSize / 2;
    let yCenter = outerPadding + rowCount * (itemSize + padding) + itemSize / 2;
    // Questo assicura che il centro del tuo cerchio (indipendentemente dalle sue dimensioni) si trovi sempre esattamente al centro della sua cella nella griglia.

    circle(xCenter, yCenter, scaledValue);



    //aumento colcount
    colCount ++;

    //controllo se siamo a fine riga
    if(colCount==cols){
      colCount = 0;
      rowCount ++;
    }
  }
}

function draw() {
  // put drawing code here
}

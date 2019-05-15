function loadFile(o) 
{
	var fr = new FileReader();
	reader.onload = function(e)
		{	
		showDataFile(e, o);
		};
	fr.readAsText(o.files[0]);
}

function showDataFile(e, o)
{
	document.getElementById("data").innerText = e.target.result;
}

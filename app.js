(function(){
	'use strict';
	
	var _ = require("underscore");
	var fs = require("fs");
	
	var exportFilepath = process.argv[2];
	
	fs.readFile(exportFilepath, 'utf8', function(err, contents) {
		if (err) throw err;
		
		var slides = processExportFileContent(contents);
		var slideString = createSlideString(slides);
		createHTMLFile(slideString);
	});
	
	/**
	 * Given the exported JSON String get the contents,
	 * lists and card contents, that will be displayed in the slides.
	 */
	function processExportFileContent (contents) {
		var boardData = JSON.parse(contents);
		var lists = _.map(boardData.lists, function(item) {
			return {
				id: item.id,
				name: item.name	
			};
		});
		
		var slides = [{
			title: boardData.name
		}];
		_.each(lists, function (item) {
			var tempCards = _.where(boardData.cards, { idList: item.id });
			var cards = _.map(tempCards, function (card) {
				return {
					title: card.name,
					content: card.desc
				};
			});		
			
			slides.push({
				title: item.name,
				subslides: cards
			});
		});
		
		return slides;
	}
	
	/**
	 * Create slide sections
	 */
	function createSlideString (slides) {
		var htmlString = "";
		_.each(slides, function(slide) {
			if (!(slide.subslides) || slide.subslides.length == 0) {
				htmlString += "<section><h1>";
				htmlString += slide.title;
				htmlString += "</h1></section>";
				return;	
			}
			
			//start section for series of vertical slides
			htmlString += "<section>";
			
			//first slide
			htmlString += "<section><h1>";
			htmlString += slide.title;
			htmlString += "</h1></section>";
			
			//create basement slides
			_.each(slide.subslides, function(subslide) {
				htmlString += "<section data-markdown><script type='text/template'>";
				htmlString += "##";
				htmlString += subslide.title;
				htmlString += " \n";
				htmlString += subslide.content;
				htmlString += "</script></section>";				
			});
			
			htmlString += "</section>";
		});
		
		return htmlString;
	}
	
	/**
	 * Create HTML file
	 */
	function createHTMLFile (slideString) {
		fs.readFile('index_template.html', 'utf8', function(err, contents) {
			if (err) throw err;
			
			var htmlString = contents.replace('{SLIDES_PLACEHOLDER}', slideString);
			
			fs.writeFile('./dist/index.html', htmlString, function(error) {
				if (error) throw error;
				console.log("File saved!");
			});	
		});
	}
})();
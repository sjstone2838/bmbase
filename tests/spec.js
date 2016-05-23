describe('biomarker base', function() {
    it('should return the summary values for drugs by label count', function(){
        browser.get('http://localhost:8000/#/');
        element(by.id('Drugs')).click()
        .then(function(){
            element(by.id('Labels-Count')).click()
            .then(function(){
                var fieldValues = {};
                fieldValues.fieldCount = element(by.id('fieldCount')).getText();
                fieldValues.fieldAverage = element(by.id('fieldAverage')).getText();
                fieldValues.fieldMax = element(by.id('fieldMax')).getText();
                fieldValues.fieldMin = element(by.id('fieldMin')).getText();
                expect(fieldValues.fieldCount).toEqual('624');
                expect(fieldValues.fieldAverage).toEqual('0.3');
                expect(fieldValues.fieldMax).toEqual('7');
                expect(fieldValues.fieldMin).toEqual('0');
            });
        });
    });

    it('should sort companies by trials count', function(){
        browser.get('http://localhost:8000/#/');
        element(by.id('Companies')).click()
        .then(function(){
            element(by.id('Trials-Count')).click()
            .then(function(){
                element(by.id('sort')).click();
                expect(element.all(by.css('.label')).get(0).getText()).toEqual("Novartis");
                expect(element.all(by.css('.value')).get(0).getText()).toEqual("48");
                expect(element.all(by.css('.value')).get(1).getText()).toEqual("41");
                expect(element.all(by.css('.value')).get(2).getText()).toEqual("23");
            });
        });
    });

    it('should sort find the label of the target with the most biomarkers', function(){
        browser.get('http://localhost:8000/#/');
        element(by.id('Targets')).click()
        .then(function(){
            element(by.id('Biomarkers-Count')).click()
            .then(function(){
                element(by.id('sort')).click();
                element.all(by.css('.bar')).get(0).click()
                var descriptionHtml = '<strong>Display Name:</strong> CRP<br><strong>Protein Name:</strong> C-reactive protein<br><strong>Description:</strong> The protein encoded by this gene belongs to the pentaxin family. It is involved in several host defense related functions based on its ability to recognize foreign pathogens and damaged cells of the host and to initiate their elimination by interacting with humoral and cellular effector systems in the blood. Consequently, the level of this protein in plasma increases greatly during acute phase response to tissue injury, infection, or other inflammatory stimuli.<br>';
                expect(element(by.css('.detailLabel')).getInnerHtml()).toEqual(descriptionHtml);
            });
        });
    });

});
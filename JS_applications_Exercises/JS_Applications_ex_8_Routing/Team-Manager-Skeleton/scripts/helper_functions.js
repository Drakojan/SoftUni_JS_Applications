
const extractFormData = (htmlForm, namesOfInputsOfHtmlForm) => {
    return namesOfInputsOfHtmlForm.reduce((acc, inputName) => {
        acc[inputName] = htmlForm.elements[inputName].value;
        return acc; // returns object that holds inputNames as properties and the respective input
    }, {});
};

const fillFormWithData = (htmlForm, formValue) => {
    if (!formValue) {
        return;
    }
    Object.entries(formValue).map(([inputName, value]) => {
        if (!htmlForm.elements.namedItem(inputName)) {
            return;
        }
        Object.entr
        htmlForm.elements.namedItem(inputName).value = value;
    }); // populates all inputs fields with the given values
};

const clearForm = (htmlForm, namesOfInputsOfHtmlForm) => {
    namesOfInputsOfHtmlForm.map(key => {
        htmlForm.elements.namedItem(key).value = '';
    }); // clears all the input fileds in the form
};

/**
 * 
 * @param {HTMLElement} htmlForm Reference to html element of type 'form'
 * @param {string[]} namesOfInputsOfHtmlForm string array describing the 'name' attribute of all inputs
 * inside the provided htmlForm (inputNames)
 */
export const createFormEntity = (htmlForm, namesOfInputsOfHtmlForm) => {
    /**
     * Return the current form value as object
     */
    const getValue = () => extractFormData(htmlForm, namesOfInputsOfHtmlForm);

    /**
     * Fills all possible form fields based on incoming object
     * @param {{[key:string]}} formValue 
     */
    const setValue = (formValue) => fillFormWithData(htmlForm, formValue);

    /**
     * Clears the form
     */
    const clear = () => clearForm(htmlForm, namesOfInputsOfHtmlForm);
    return {
        getValue,
        setValue,
        clear
    };
};
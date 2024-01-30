if (!window.hasRun)
{
    window.hasRun = true;
    window.onload = function()
    {
      const blockContainer = document.querySelector('.block-container');
      const blockBody = blockContainer.querySelector('.block-body');
    
      if (!document.getElementById('multiKeyInput'))
      {
        const newInputField = document.createElement('dl');
        newInputField.className = 'formRow formRow--input';
        newInputField.innerHTML = `<dt><div class=formRow-labelWrapper><label class=formRow-label for=multiKeyInput>Keys</label></div><dd><input class=input id=multiKeyInput name=multiKey>`;
        blockBody.appendChild(newInputField);
      }
    
      if (!document.getElementById('startButton'))
      {
        const startButton = document.createElement('dl');
        startButton.className = 'formRow formSubmitRow formSubmitRow--simple';
        startButton.innerHTML = `<dt><dd><div class=formSubmitRow-main><div class=formSubmitRow-bar></div><div class=formSubmitRow-controls><button class="button button--primary"id=startButton type=button><span class=button-text>Start</span></button></div></div>`;
        blockContainer.appendChild(startButton);
    
        document.getElementById('startButton').addEventListener('click', function()
        {
          const keys = document.getElementById('multiKeyInput').value.split(/,\s?|\s/);
          activatekeys(keys);
        });
      }
    }

    function clickButtonByText(...buttonTexts)
    {
      const buttons = document.querySelectorAll('span.button-text');
      const button = Array.from(buttons).find(button => buttonTexts.includes(button.textContent));

      if (button)
      {
        button.click();
      }
    }
    
    async function activatekeys(keys)
    {
      const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    
      async function activatekey(key)
      {
        let index = 0;
        let activated = false;
        const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
        while (!activated && index < characters.length)
        {
          const combination = key.replace('*', characters[index]);
    
          const inputfield = document.querySelector('input[name="key"]');
          inputfield.value = combination;
    
          clickButtonByText("Активировать ключ", "Activate key");
    
          await delay(1000);
    
          const messageElements = document.querySelectorAll('.flashMessage-content');
    
          if (messageElements.length > 0)
          {
            const message = messageElements[messageElements.length - 1].textContent;
    
            if (message === 'Ключ не найден!' || message === 'Key not found!')
            {
              index += 1;
            }
            else
            {
              activated = true;
              console.log(`Key activated: ${combination}`);
            }
          }
          else
          {
            //console.log('Error: message element not found!');
          }
        }
      }
    
      for (const key of keys)
      {
        await activatekey(key);
      }
    }
}
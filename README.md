![CoCo Logo](images/imperson_logo_black.png)

# Conversational components with CoCo examples

An example of how to use Conversational Components (CoCo) in your chatbot, with integration to google dialogflow.

1. [Background](#Background)
2. [Getting Started](#GettingStarted)
3. [High Level Architercure](#MoreAboutExample)
    1. [add new comp](#subparagraph1)
    2. [component and action functions](#component_actions)
    2. [contol transfer](#control_transfer)
    3. [customize the action](#CustomizeAction)
    4. [share content with comp](#ShareContent)
    5. [customize the comp](#CustomizeComp)

## Background <a name="Background"></a>
### Conversational Components
CoCo is a concept developed to address the problem of reusability in chatbots.  
  
Each CoCo maintains its own state, performs its own understanding, includes actions(+responses) and exposes a small interface to pass inputs, responses and context back and forth.

### CoCo
CoCo is the first vendor to offer pre-built components

[CoCo website](https://www.coco.imperson.com/)  
[CoCo developers console](https://app.coco.imperson.com/)  

## Getting Started<a name="GettingStarted"></a>
python3 is required to run the examples and we recommend using a virtualenv

```bash 
1. git clone https://github.com/chenb67/coco_examples
2. pip install -r requirements.txt
3. generate a dialogflow bot and import the included intents and entities
4. create and download service account json and place it under root - dialogflow_serviceaccount.json
5. python console_tester.py
```

## More About The Examples <a name="MoreAboutExample"></a>
In this repo we demostrate integration with CoCo, nlu platforms and other services to create a chatbot
Below is some general info about the architecture

Live bot demo: https://webdemo1-dot-coco-235210.appspot.com

### Adding new comp <a name="subparagraph1"></a>
Call CoCo with the user input and get the component's response.

```python
def coco_exchange(component_id, session_id, **kwargs):
    return requests.post(
        "https://app.coco.imperson.com/api/exchange/" 
        f"{component_id}/{session_id}",
        json=kwargs,
    ).json()

response = coco_exchange("namer_vp3", state["session_id"], user_input=user_input)
```

When CoCo returns component_done=true it means the control goes back to the calling bot/component. This a good time to collect variables and update the state

```python
if response["component_done"]:
        state["user"] = response["updated_context"].get("user")
        first_name = response["updated_context"].get("user", {}).get("firstName", "")
        return [get_drink_action(first_name)], None, True
return [response["response"]], None, False
```

### Component and actions functions <a name="component_actions"></a>

```python
def component_name(state, user_input):
    return [], str, bool

def action_name(**kwargs):
    return str
```
Component function takes two params - the state and the user_input
it returns a tuple:
1. a list of responses
2. a new component to call and add to the stack or none
3. if done and should stop call this comp

Available components registery is under \_\_init__.py:
```python
from coffeeshop.components_coco import namer_comp
```

### Condition to control transfer to a component <a name="control_transfer"></a>

```python
if (
        interpretation.intent.display_name == "Default Welcome Intent"
        and not "name" in state
    ):
return [], "namer_comp", False
```

Return statement with no responses means recursively call the stack again with the new comp on top now.


> U: hi  <--- "Default Welcome Intent" calling CoCo  
> B: Can you please tell me your name?  
> U: Mor Buskilla  
> B: Hello mor. Nice to meet you. Is your last name Buskilla?   
> U: yes  

### Customize The Action (optional) <a name="CustomizeAction"></a>

Best to have the actions under functions that use the state to determine how the text will look.

```python
def get_drink_action(first_name=""):
    if first_name:
        return f"Nice to meet you {first_name}, What can I get you to drink?"
return "Hi, What can I get you to drink?"
```


> U: hi  
> B: Can you please tell me your name?  
> U: Mor Buskilla  
> B: Hello mor. Nice to meet you. Is your last name Buskilla?  
> U: yes                                                     
> B: Nice to meet you mor, What can I get you to drink?      <--- custome response      
> U: coffee  


### Share Content With Comp <a name="ShareContent"></a>
Many of the components make use of available information like name
Here how to pass this data to Coco:

```python
response = call_coco(
            "CoCoSurvey_619c51d02b6eb5", 
            state["session_id"], 
            user_input=user_input, 
            context={
                "user": state["user"] # {"firstName": "SomeName"}
                }
            )
```

> U: hi  
> B: Can you please tell me your name?  
> U: Mor Buskilla  
> B: Hello mor. Nice to meet you. Is your last name Buskilla?  
> U: yes  
> B: Nice to meet you mor, What can I get you to drink?  
> U: coffee  
> B: Would you like a delivery or pick-up?  
> U: delivery  
> B: So, **mor**, I would like your address so that I can send you mail. I promise not to send anything without your prior consent.  Do you live in the US?               <--- using the name from CoCoNamer   



### Customize The Comp <a name="CustomizeComp"></a>
@ app.coco.imperson.com

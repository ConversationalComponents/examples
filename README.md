![alt text](imperson_logo_black.png)

# Conversational components with CoCo examples

an example of how to use coco in your chatbot, with integration to google dialogflow

1. [More about coco](#MoreAboutCoco)
2. [More about the example](#MoreAboutExample)
3. [Getting Started](#GettingStarted)
4. [working steps](#GettingStarted)
    1. [add new comp](#subparagraph1)
    2. [integrate the comp](#IntegrateComp)
    3. [customize the action](#CustomizeAction)
    4. [share content with comp](#ShareContent)
    5. [customize the comp](#CustomizeComp)

## More About Coco <a name="MoreAboutCoco"></a>
CoCo - Conversational Components -   
[coco website](https://www.coco.imperson.com/)  
[coco app](https://app.coco.imperson.com/)  

## More About The Example <a name="MorAboutExample"></a>
In this example integrate to a dialogflow chatbot Namer, Get_Address and Survey components 

## Getting Started<a name="GettingStarted"></a>
1. git clone https://github.com/chenb67/coco_examples


## Working Steps <a name="GettingStarted"></a>

### Adding new comp <a name="subparagraph1"></a>
call coco with the user input and get the component's response

```python
def call_coco(component_id, session_id, **kwargs):
    return requests.post(
        "https://coco-235210.appspot.com/api/exchange/" f"{component_id}/{session_id}",
        json=kwargs,
    ).json()

response = call_coco("namer_vp3", state["session_id"], user_input=inp)
```

choose when to go back to yout chatbot from the component

```python
if response["component_done"]:
        state["name"] = response["updated_context"]
        first_name = response["updated_context"].get("user.firstName")
        return [get_drink_action(first_name)], None, True
return [response["response"]], None, False
```
here when the component gets "component_done" it means it has the name of the user and this is when getting back to chatbot

the return value contains 3 parameters:
1. a list of responses - the comp response/ the bot response/ custume response
2. if want to call new comp return it's name else return None
3. finish this comp - bool

if need to store any data in the conv state 

```python
from coffeeshop.components_coco import namer_comp,
```
in __init__.py import the new comp function

### Integrate The Comp <a name="IntegrateComp"></a>

```python
if (
        interpretation.intent.display_name == "Default Welcome Intent"
        and not "name" in state
    ):
return [], "namer_comp", False
```
on the chatbot flow choose when to call comp

in the example above return no response call the "namer_comp" and don't finish yet with the comp


> U: hi  <--- "Default Welcome Intent" calling CoCo  
> B: Can you please tell me your name?  
> U: Mor Buskilla  
> B: Hello mor. Nice to meet you. Is your last name Buskilla?   
> U: yes  

### Customize The Action (optional) <a name="CustomizeAction"></a>
In case we have first name use it when performing get drink action
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
in the example below get_address using the name data 

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

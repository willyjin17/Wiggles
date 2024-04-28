# Wiggles

Wiggles is a web application designed to connect pet parents and make their lives a bit easier. <br/>
Feel free to give us any kind of feedbacks at https://forms.gle/LP1JMfTd3omQXLe88 or at wigglesforpets@gmail.com, we are reading every suggestion and working towards making Wiggles better each day.

## Features

### QR Code Integration

Wiggles uses QR codes to help pet parents connect with each other and share essential information about their furry friends.

### Lost Pet Assistance

In the unfortunate event that a pet goes missing, Wiggles provides a "Lost Mode" feature, converting the QR code into a digital tag with crucial information for a quick reunion.

### Social Connectivity

Share your pet's QR code on various social media platforms to connect with other pet parents and their adorable companions.

### Vaccination Records

Wiggles includes a dedicated section for storing and managing vaccination details for your pets. Easily generate a PDF of your pet's vaccination records or use a link for sharing or safekeeping.

## Git Messaging Convention

This is the convention to be followed for commit messages. This will help maintain readability, traceability, and collaboration throughout the development process.

### Commit Message Structure

A commit message consists of three distinct parts separated by a blank line: the header, the body, and the footer. Each part should be concise and informative.

<pre>
<b><a href="#types">&lt;type&gt;</a></b></font>(<b><a href="#scope">&lt;optional scope&gt;</a></b>): <b><a href="#description">&lt;description&gt;</a></b>
<sub>empty separator line</sub>
<b><a href="#body">&lt;optional body&gt;</a></b>
<sub>empty separator line</sub>
<b><a href="#footer">&lt;optional footer&gt;</a></b>
</pre>

#### Header

The header is a single line that summarizes the change in a clear and descriptive manner. It includes a type, a scope, and a succinct description. 

##### Types

The type describes the kind of change that this commit is providing.

feat: A new feature <br/>
fix: A bug fix <br/>
docs: Documentation changes <br/>
style: A CSS or formatting change <br/>
refactor: Code refactorings <br/>
test: Adding missing tests or correcting existing ones <br/>
chore: Changes that do not affect the external user (e.g. updating the .gitignore file or .prettierrc file). <br/>

##### Scope

The scope provides context for the commit, indicating the component or area of the codebase affected by the change. Eg. all, component name, api, etc.

##### Description

A succinct description of the change, written in the imperative mood. Don't capitalize the first letter, no dot (.) at the end.

#### Body

The body provides more detailed information about the change, including motivation, justification, and any other relevant details. It should be written in the present tense.

#### Footer

The footer contains any metadata relevant to the commit, such as issue tracking numbers or breaking changes.

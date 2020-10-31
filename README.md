# Firebase Twilio Example

Simple web app that let users enter their phone number and send an access code to their phone for authorization.

### Front-end
- Bootstrap with create-react-app
- Styled with Material UI
- Hosted on Firebase hosting


### Back-end
- Simple REST API with Express Framework
- Consists of 2 POST requests:
    - (POST) CreateNewAccessCode
    Parameters: phoneNumber
    Return: a random 6-digit access code
  
    - (POST) ValidateAccessCode
    Parameters: accessCode, phoneNumber
    Return: { success: true }
- SMS is handled with Twilio service
- Deployed onto Firebase Function
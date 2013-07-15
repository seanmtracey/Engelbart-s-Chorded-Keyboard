int firstButton = 2;
int secondButton = 3;
int thirdButton = 4;
int fourthButton = 5;
int fifthButton = 6;

int firstState = 0;
int secondState = 0;
int thirdState = 0;
int fourthState = 0;
int fifthState = 0;

int ledPin =  11; 

void setup() {
  pinMode(ledPin, OUTPUT);      
  pinMode(firstButton, INPUT);
  pinMode(secondButton, INPUT);
  pinMode(thirdButton, INPUT);
  pinMode(fourthButton, INPUT);
  pinMode(fifthButton, INPUT);
  
  Serial.begin(9600);
  
}

void loop(){
  // read the state of the pushbutton value:
  firstState = digitalRead(firstButton);
  secondState = digitalRead(secondButton);
  thirdState = digitalRead(thirdButton);
  fourthState = digitalRead(fourthButton);
  fifthState = digitalRead(fifthButton);
  
  String report = "";
  
  if(firstState == HIGH){
    report = report + "0"; 
  } else {
     digitalWrite(ledPin, HIGH);
      report = report + "1";
  }
  
  if(secondState == HIGH){
    report = report + "0";
  } else {
    digitalWrite(ledPin, HIGH); 
    report = report + "1";  
  }
  
  if(thirdState == HIGH){
     report = report + "0"; 
  } else {
     digitalWrite(ledPin, HIGH); 
     report = report + "1";  
  }
   
   if(fourthState == HIGH){
    report = report + "0";
  } else {
     digitalWrite(ledPin, HIGH); 
     report = report + "1";
   }
   
   if(fifthState == HIGH){
     report = report + "0";
   } else {
     digitalWrite(ledPin, HIGH); 
     report = report + "1";
   }
  
  Serial.println(report);

}

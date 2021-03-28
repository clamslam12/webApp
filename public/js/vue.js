const app = Vue.createApp({
  data() {
    return {
      firstName: "",
      lastName: "",
      location: "",
      email: "",
      userName: "",
      password: "",
      confirmPassword: "",
      response: "",
      bio: "",
      passwordMatch: true,
      capitalLetters: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ],
      lowerCaseLetters: [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
      ],
      numbers: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
      nonInputs: ["<", ">", "#", "-", "{", "}", "(", ")", "'", '"', "`"],
      //invalid chars, upper/lower case, and number flags for conditional rendering error messsages; v-if/v-show
      firstNameOk: true,
      lastNameOk: true,
      locationOk: true,
      emailOk: true,
      userNameOk: true,
      validPassword: true,
      responseOk: true,
      bioOk: true,
      upperCaseOk: false,
      lowerCaseOk: false,
      numberOk: false,
      noInvalidChars: true,
      //to keep track of error message count for each input;
      //use to delete error message for corrected inputs and keep error message for uncorrected ones
      firstNameErrorCount: 0,
      lastNameErrorCount: 0,
      locationErrorCount: 0,
      emailErrorCount: 0,
      userNameErrorCount: 0,
      responseErrorCount: 0,
      bioErrorCount: 0,
      //dynamically show drop down list when selected
      dropDownResponseSelected: "",
    };
  },
  methods: {
    validateForm(e) {
      //runs in O(1) if .includes() is O(1)
      //reset count
      this.firstNameErrorCount = 0;
      this.lastNameErrorCount = 0;
      this.locationErrorCount = 0;
      this.emailErrorCount = 0;
      this.userNameErrorCount = 0;
      this.responseErrorCount = 0;
      this.bioErrorCount = 0;
      //flag for no error; set to false when any input error occurs; used for return statement; submit if true, else dont submit
      let noError = true;
      //else statements used to not show error message and background; using v-if/v-show
      if (this.password != this.confirmPassword) {
        this.passwordMatch = false;
        noError = false;
        console.log(this.password, this.confirmPassword);
      } else if (this.password == this.confirmPassword) {
        this.passwordMatch = true;

        //checking for invalid chars
        for (let i = 0; i < this.nonInputs.length; i++) {
          //if contains invalid chars
          if (
            this.password.includes(this.nonInputs[i]) == true ||
            this.confirmPassword.includes(this.nonInputs[i]) == true
          ) {
            this.noInvalidChars = false;
            noError = false;
            console.log("contains invalid chars");
            break; //as soon as an invalid char is detected, break out of loop; no need to continue because cant accept an invalid char
          } else {
            this.noInvalidChars = true;
          }
        }
        //checking for upper case letter
        for (let i = 0; i < this.capitalLetters.length; i++) {
          //if password include a capital letter
          if (this.password.includes(this.capitalLetters[i])) {
            this.upperCaseOk = true;
            break;
          } else {
            this.upperCaseOk = false;
          }
        }

        //checking for lower case letter
        for (let i = 0; i < this.capitalLetters.length; i++) {
          //if password include a lower case letter
          if (this.password.includes(this.lowerCaseLetters[i])) {
            this.lowerCaseOk = true;
            break;
          } else {
            this.lowerCaseOk = false;
          }
        }

        //checking for number
        for (let i = 0; i < this.capitalLetters.length; i++) {
          //if password include a number
          if (this.password.includes(this.numbers[i])) {
            this.numberOk = true;
            break;
          } else {
            this.numberOk = false;
          }
        }
        //finalizing invalid chars, upper/lower case letter, and number check
        if (
          this.upperCaseOk == true &&
          this.lowerCaseOk == true &&
          this.numberOk == true &&
          this.noInvalidChars == true
        ) {
          this.validPassword = true;
        } else {
          this.validPassword = false;
          noError = false;
        }
      }
      //check for invalid chars for inputs
      for (let i = 0; i < this.nonInputs.length; i++) {
        if (this.firstName.includes(this.nonInputs[i])) {
          this.firstNameOk = false;
          noError = false;
          this.firstNameErrorCount++;
          console.log("first name contains invalid chars");
        } else {
          if (this.firstNameErrorCount == 0) {
            this.firstNameOk = true;
          }
        }
        if (this.lastName.includes(this.nonInputs[i])) {
          this.lastNameOk = false;
          noError = false;
          this.lastNameErrorCount++;
        } else {
          if (this.lastNameErrorCount == 0) {
            this.lastNameOk = true;
          }
        }
        if (this.location.includes(this.nonInputs[i])) {
          this.locationOk = false;
          noError = false;
          this.locationErrorCount++;
        } else {
          if (this.locationErrorCount == 0) {
            this.locationOk = true;
          }
        }
        if (this.email.includes(this.nonInputs[i])) {
          this.emailOk = false;
          noError = false;
          this.emailErrorCount++;
        } else {
          if (this.emailErrorCount == 0) {
            this.emailOk = true;
          }
        }
        if (this.userName.includes(this.nonInputs[i])) {
          this.userNameOk = false;
          noError = false;
          this.userNameErrorCount++;
        } else {
          if (this.userNameErrorCount == 0) {
            this.userNameOk = true;
          }
        }
        if (this.response.includes(this.nonInputs[i])) {
          this.responseOk = false;
          noError = false;
          this.responseErrorCount++;
        } else {
          if (this.responseErrorCount == 0) {
            this.responseOk = true;
          }
        }
        if (this.bio.includes(this.nonInputs[i])) {
          this.bioOk = false;
          noError = false;
          this.bioErrorCount++;
        } else {
          if (this.bioErrorCount == 0) {
            this.bioOk = true;
          }
        }
      }
      if (noError) {
        return noError;
      } else {
        e.preventDefault();
      }
    },
  },
});

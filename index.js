import index from 'readline';
import {isEmail, isEmpty, isNotEmpty} from 'class-validator';
import {getUnreadEmailCount} from "./unread-email-count.js";

const rl = index.createInterface({
    input: process.stdin,
    output: process.stdout
});

const getAnswer = (text) => {
    return new Promise((resolve) => {
        rl.question(text, (value) => {
            resolve(value);
        });
    });
}

const main = async () => {
    let email, password, isInputCorrect;

    do {
        email = await getAnswer('Enter your email: ');
        isInputCorrect = isEmail(email);

        if (!isInputCorrect) {
            console.log('Wrong email format! Example: example@example.com');
        }
    } while (!isInputCorrect);

    do {
        password = await getAnswer(
            'Enter your app password: '
        );

        isInputCorrect = isNotEmpty(password);

        if (!isInputCorrect) {
            console.log('Password can\'t be an empty string!');
        }
    } while (!isInputCorrect);

    rl.close();

    getUnreadEmailCount({ user: email, password});
}

main()
    .then()
    .catch(err => console.log(err.message));

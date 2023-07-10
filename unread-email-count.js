import Imap from 'imap';

export const getUnreadEmailCount = (creds) => {
    const config = {
        ...creds,
        host: 'imap.gmail.com',
        port: 993,
        tls: true,
        tlsOptions: {
            rejectUnauthorized: false
        }
    };

    const countUnreadEmails = () => {
        return new Promise((resolve, reject) => {
            const imap = new Imap(config);

            imap.once('ready', function() {
                imap.openBox('INBOX', true, function(err, mailbox) {
                    if (err) {
                        imap.end();
                        reject(err);
                        return;
                    }

                    const searchCriteria = ['UNSEEN'];

                    imap.search(searchCriteria, function(err, results) {
                        if (err) {
                            imap.end();
                            reject(err);
                            return;
                        }

                        const count = results.length;

                        imap.end();
                        resolve(count);
                    });
                });
            });

            imap.once('error', (err) => {
                reject(err);
            });

            imap.connect();
        });
    }

    countUnreadEmails()
        .then(count => console.log('Unread email count:', count))
        .catch(err => console.log(err.message));
};

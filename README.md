# Insert HTML - Outlook Add-In
## An Outlook add-in that lets you quickly and easily insert custom HTML into your emails

This add-in allows for inserting HTML code into e-mails to create visually engaging messages with rich content, such as images, links, and formatted text.

### Limitations

Not all HTML is supported by e-mail clients - if the message appears broken, the code is probably not supported by Outlook. **The add-in does not modify the HTML code in any way**.
For best compatibility, use a dedicated tool for creating e-mail templates, such as [the HTML Email Builder](https://inetum-poland.github.io/html-email-builder/).

This add-in works best on Outlook for Web.

### Development

1. Create an `.env` file based on `.env.example`.
2. Run `npm run build`.
3. Run `npm run start`.

When building the application for the first time, you may be asked to install certificates on your machine and log into your Outlook account.

If the application has been successfully side-loaded, you should be able to debug the add-in with live reload:

1. Open [Outlook for Web](https://outlook.office.com) and begin composing a new message.
2. In the *Insert* tab, select *Apps*.
3. The add-in should show up in the available options.

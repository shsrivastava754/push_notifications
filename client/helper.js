self.addEventListener('push',e=>{
    const data=e.data.json();

    self.registration.showNotification(data.title,{
        body:'Received a mail from KB',
        icon: 'https://media.licdn.com/dms/image/C4D0BAQFNmQxTYx2A9A/company-logo_200_200/0/1627366597415?e=2147483647&v=beta&t=y4v1_vC-ODXXzTrNf_cLnBQU6UpZaUv5bnhT8eYfKxU'
    });
});
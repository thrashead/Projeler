using System;
using System.Net;
using System.Net.Mail;
using System.Web;

namespace Lib
{
    public class Mailci
    {
        public string Gonderen { get; set; }
        public string Konu { get; set; }
        public string Icerik { get; set; }

        public static MailDurum MailAt(string gonderen, string konu, string icerik)
        {
            MailDurum kontrol = MailDurum.Basarili;

            if (HttpContext.Current.Session["Mail"] == null)
            {
                try
                {
                    MailMessage mesaj = new MailMessage(ConfigGrabber.MailGonderen, ConfigGrabber.MailAlan);
                    SmtpClient alici = new SmtpClient(ConfigGrabber.MailSunucu, ConfigGrabber.MailPort);
                    NetworkCredential hesap = new NetworkCredential(ConfigGrabber.MailGonderen, ConfigGrabber.MailSifre);
                    string s = "<u>" + gonderen + "</u><br><br><b>" + konu + "</b><br><br>" + icerik;
                    alici.UseDefaultCredentials = false;
                    alici.Credentials = hesap;
                    mesaj.IsBodyHtml = true;
                    mesaj.Subject = "Kullanıcı Yorumu";
                    mesaj.Body = s;
                    alici.Send(mesaj);
                    HttpContext.Current.Session["Mail"] = true;
                }
                catch (Exception ex)
                {
                    kontrol = MailDurum.Basarisiz;
                }
            }
            else
            {
                kontrol = MailDurum.HakYok;
            }

            return kontrol;
        }
    }

    public enum MailDurum
    {
        Basarili,
        Basarisiz,
        HakYok
    }
}

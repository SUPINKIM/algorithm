using System;
using System.Linq;     // Reverse()를 사용하기 위해 추가


namespace ConsoleApp1
{
    class Program
    {
        static void Main(string[] args)
        {
            string a = Console.ReadLine();
            string[] b = a.Split(" ");

            for (int i = 0; i < b.Length; i++)
            {
                string c = " "+b[i];
                string d = new string(c.ToCharArray().Reverse().ToArray());

                for (int j = 0; j < d.Length; j++)
                {
                    string e = d[j].ToString();

                    Console.Write(e);
                }              
            }
        }
    }
}


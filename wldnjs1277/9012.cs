using System;
using System.Linq;
using System.Collections.Generic;


namespace ConsoleApp2
{
    class Program
    {
        static void Main()
        {
            Stack<string> stack = new Stack<string>();

            string[] a = {"(())())","(((()())()","(()())((()))","((()()(()))(((())))()","()()()()(()()())()","(()((())()("};
            //string[] a = { "((", "))", "())(()" };
            for (int i = 0; i < a.Length; i++)
            {
                string b = a[i];
                for (int j = 0; j < b.Length; j++)
                {
                    if (b[j].ToString() =="(")
                    {
                        stack.Push("(");
                    }
                    if (b[j].ToString() ==")")
                    {
                       
                        if (stack.Count != 0)
                        {
                            stack.Pop();
                        }
                        else
                        {
                            Console.WriteLine("NO");
                            break;
                        }
                    }
                    if (j == b.Length -1)
                    {
                        if (stack.Count == 0)
                        {
                            Console.WriteLine("YES");
                        }
                        else
                        {
                            Console.WriteLine("NO");
                        }
                    }
                }
                stack.Clear();
            }
        }
    }
}


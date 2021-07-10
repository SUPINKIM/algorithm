using System;
using System.Text;     //stringbuilder를 사용하기 위해 호출
using System.Collections.Generic;
namespace ConsoleApp3
{
    class Program
    {
        static void Main(string[] args)
        {
            Stack<int> stack = new Stack<int>();
            int num =  int.Parse( Console.ReadLine());
            StringBuilder sb = new StringBuilder();               // c# 반복문에서 string을 계속 사용하면 성능 저하가 올 수 있다하여 해결법으로 stringbuilder를 사용하라는 글을봐서 사용해봤어요 
            int i = 1;
            while (num-- > 0)
            {
                int input = int.Parse(Console.ReadLine());
                while (i <= input)
                {
                    stack.Push(i);
                    sb.Append("+\n");
                    i++;
                }

                if (stack.Peek() == input)
                {
                    stack.Pop();
                    sb.Append("-\n");
                }
                else
                {
                    Console.WriteLine("NO");
                }
            }
            Console.WriteLine(sb);
        }
    }
}

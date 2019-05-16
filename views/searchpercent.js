function search(w1, w2)
{
  let l1 = w1.length;
  let l2 = w2.length;

  let ch,c,maxc=0;
  let i,j;

  for(i=0;i<l1;i++)
  {
    ch = w1.charAt(i);

    for(j=0;j<l2;j++)
    {
      if(ch === w2.charAt(j))
      {
        c=1;
        tempi = i;
        tempj = j;
        while(w1.charAt(++tempi) === w2.charAt(++tempj))
          c++;

        if(c>maxc)
        {
          maxc = c;
        }
      }
    }
  }
  let perc_match = maxc/l1*100;
  return perc_match;
}

module.exports(
  search
);

﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CinemaPlanet.Domain.Core
{
    public class JWTSecret
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Secret { get; set; }
    }
}
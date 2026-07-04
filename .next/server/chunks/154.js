"use strict";exports.id=154,exports.ids=[154],exports.modules={38856:(a,b,c)=>{c.d(b,{A:()=>g});var d=c(21124),e=c(76117),f=c(8662);function g({post:a,index:b,onClick:c}){return(0,d.jsxs)(e.P.div,{className:"cyber-glass p-5 cursor-pointer group relative overflow-hidden",initial:{opacity:0,y:30,rotate:-1+37*b%100/50},whileInView:{opacity:1,y:0,rotate:0},viewport:{once:!0},transition:{duration:.5,delay:.1*b},whileHover:{scale:1.03,boxShadow:"0 0 20px rgba(0,255,255,0.4), 0 0 40px rgba(0,255,255,0.2)"},onClick:c,onMouseEnter:()=>(0,f.playSound)("hover"),children:[(0,d.jsxs)("div",{className:"flex items-center gap-2 mb-3",children:[(0,d.jsx)("div",{className:"w-2 h-2 rounded-full bg-cyber-green animate-pulse"}),(0,d.jsx)("span",{className:"font-code text-[10px] text-cyber-green uppercase tracking-widest",children:"Intercepted"}),(0,d.jsx)("span",{className:"font-code text-[10px] text-cyber-blue-dim ml-auto",children:a.date})]}),(0,d.jsx)("h3",{className:"font-cyber text-sm md:text-base text-cyber-blue mb-2 uppercase tracking-wider group-hover:text-neon-pink transition-colors",children:a.title}),(0,d.jsx)("p",{className:"font-code text-xs text-cyber-blue-dim line-clamp-2 mb-3",children:a.excerpt}),(0,d.jsxs)("div",{className:"flex items-center justify-between",children:[(0,d.jsx)("div",{className:"flex gap-1.5 flex-wrap",children:a.tags.slice(0,2).map(a=>(0,d.jsx)("span",{className:"px-2 py-0.5 text-[10px] font-code bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/20 rounded",children:a},a))}),(0,d.jsx)("span",{className:"font-code text-[10px] text-cyber-blue-dim",children:a.readTime})]}),(0,d.jsxs)("div",{className:"absolute top-0 right-0 w-12 h-12",children:[(0,d.jsx)("div",{className:"absolute top-2 right-2 w-4 h-[1px] bg-cyber-blue opacity-50"}),(0,d.jsx)("div",{className:"absolute top-2 right-2 w-[1px] h-4 bg-cyber-blue opacity-50"})]}),(0,d.jsx)("div",{className:"absolute inset-0 bg-gradient-to-br from-cyber-blue/5 to-cyber-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"})]})}},87755:(a,b,c)=>{c.d(b,{A:()=>d});let d=[{id:"blog-1",slug:"llm-red-teaming-sentinel-ai",title:"LLM Red Teaming: How I Built Sentinel AI to Break Large Language Models",excerpt:"Most AI systems are tested for what they should do. I built a framework to test what they should never do — and the results were eye-opening.",date:"2026-05-14",tags:["LLM","AI Safety","Python","Red Teaming"],readTime:"8 min read",related:["blog-2","blog-3"],content:`## The Problem with AI Safety Testing

Large Language Models are deployed everywhere — customer support, coding assistants, medical information, legal research. But most of these systems are evaluated only on the happy path: does it answer correctly when given a clean, well-intentioned prompt?

I built **Sentinel AI**, an LLM Red Teaming Framework, because the more important question is: what happens when someone tries to break it?

## What is LLM Red Teaming?

Red teaming comes from military strategy — you put a team in the adversary's position and have them attack your own defenses. In AI safety, it means systematically probing a language model to find:

- **Jailbreaks**: prompts that bypass the model's safety guardrails
- **Prompt injections**: hidden instructions smuggled inside user inputs
- **Alignment failures**: cases where the model does something technically correct but ethically wrong
- **Hallucination patterns**: predictable categories of confident wrong answers
- **Data leakage**: unintended exposure of training data or system prompts

## How Sentinel AI Works

The framework is built in Python with three core modules:

### 1. Attack Generation Engine
This module generates adversarial prompts using a taxonomy I built from published AI safety research. Categories include role-playing attacks (asking the model to pretend to be a different AI), indirect injection (embedding instructions in supposed "user data"), and suffix attacks that confuse the model's context window.

\`\`\`python
class AdversarialGenerator:
    def generate(self, target_behavior: str, attack_type: AttackType) -> List[str]:
        prompts = []
        for template in self.templates[attack_type]:
            prompts.append(template.format(behavior=target_behavior))
        return prompts
\`\`\`

### 2. Alignment Evaluation Module
After each attack, the module classifies the response: did the model comply, refuse, or partially comply? It uses a secondary evaluator model (separate from the model being tested) to score responses against a rubric.

### 3. Safety Report Generator
All results are aggregated into a structured report — attack success rates by category, most vulnerable prompt patterns, and a risk score from 0 to 100.

## Key Findings from Testing

After running Sentinel AI against several publicly available models:

- Role-playing attacks have an average 34% success rate against models without explicit persona-guard tuning
- Indirect injection through "user-provided documents" succeeds significantly more often than direct requests
- Models fine-tuned for helpfulness tend to be more vulnerable than base models — the alignment that makes them useful also makes them easier to manipulate

## What This Means for AI Development

Building this framework changed how I think about AI systems. Safety cannot be an afterthought bolted on after training. It needs to be:

1. **Adversarially evaluated** during RLHF and fine-tuning
2. **Continuously monitored** in production with automated red team probes
3. **Treated as a security problem**, not just a capability problem

The GitHub repo includes the full framework, documentation, and a test suite you can run against your own models.

> **GitHub:** [Sentinel AI: LLM Red Teaming Framework](https://github.com/Pavan8104/llm-red-teaming-framework)
`},{id:"blog-2",slug:"building-production-rag-pipelines",title:"Building Production RAG Pipelines: LangChain, ChromaDB, and Lessons Learned",excerpt:"RAG looks simple on the surface — retrieve context, inject it, generate answer. Production RAG is a completely different beast. Here is what actually works.",date:"2026-04-28",tags:["RAG","LangChain","Python","AI"],readTime:"7 min read",related:["blog-1","blog-3"],content:`## Why RAG is Harder Than It Looks

Retrieval-Augmented Generation (RAG) is the architecture behind almost every production LLM application — customer support bots, internal knowledge bases, document Q&A systems. The concept is straightforward: when a user asks a question, retrieve relevant documents, inject them into the prompt as context, and let the LLM generate an answer grounded in your data.

In practice, most RAG systems fail silently. They retrieve the wrong documents, inject too much context, or produce confident answers from irrelevant sources. Here's what I've learned from building real RAG pipelines.

## The Core Architecture

A production RAG pipeline has six stages:

\`\`\`
User Query → Query Processing → Vector Retrieval → Reranking → Context Assembly → LLM Generation
\`\`\`

Each stage is a failure point.

## Stage 1: Document Ingestion

This is where most tutorials skip the hard part. Real documents are:
- PDFs with scanned pages (need OCR)
- HTML with navigation menus polluting the content
- Tables that chunk badly
- Code blocks that need to stay together

The chunking strategy matters enormously. Fixed-size chunking (split every 512 tokens) is the default in most tutorials but performs poorly on structured documents. **Semantic chunking** — splitting on meaningful boundaries like paragraphs, sections, and topic shifts — gives significantly better retrieval precision.

\`\`\`python
from langchain.text_splitter import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=800,
    chunk_overlap=100,
    separators=["

", "
", ". ", " ", ""]
)
\`\`\`

## Stage 2: Embedding and Vector Storage

I use ChromaDB for local development and Pinecone for production. The embedding model choice matters more than the vector database choice. OpenAI's \`text-embedding-3-small\` is a solid default. For domain-specific retrieval, fine-tuned embeddings on your corpus will outperform general-purpose ones.

One mistake I made early: not normalizing metadata. When your vectors have inconsistent metadata (some documents have \`source\`, others have \`url\`, others have nothing), filtering queries become unreliable.

## Stage 3: Query Processing

Naive RAG sends the raw user query to the retriever. This breaks for:
- Ambiguous queries ("what did we decide about pricing?")
- Multi-part questions ("compare X and Y and tell me which is better for Z")
- Follow-up questions in conversations ("what about the previous version?")

**HyDE (Hypothetical Document Embeddings)** solves part of this — you ask the LLM to generate a hypothetical answer, embed that, and retrieve against it. The hypothetical answer often matches real document embeddings better than the question does.

## Stage 4: Reranking

Vector similarity is not the same as relevance. A cross-encoder reranker (I use Cohere's rerank endpoint) takes your top-K retrieved chunks and re-scores them with full attention to both query and document. The top 3-5 after reranking are substantially more relevant than top-K by vector similarity alone.

## Stage 5: Context Assembly and the Lost-in-the-Middle Problem

Research has shown LLMs have a "lost in the middle" problem — information in the middle of a long context window is less reliably used than information at the beginning and end. For RAG this means:

- Put the most relevant chunk **first** and **last**
- Keep total context under 2,000 tokens for reliability
- Add a brief summary line before each chunk indicating its source

## Stage 6: Evaluating RAG Quality

This is the most neglected part. Use **RAGAs** metrics:
- **Context Precision**: are the retrieved chunks actually relevant?
- **Context Recall**: did retrieval capture all necessary information?
- **Answer Faithfulness**: does the generated answer actually use the context?
- **Answer Relevancy**: does the answer address the question?

Building an evaluation harness before optimizing your pipeline is essential — otherwise you don't know if your changes are helping.

## Final Takeaway

Good RAG is not about finding the best vector database. It's about: clean ingestion, smart chunking, query expansion, reranking, and continuous evaluation. Most RAG failures happen in stages 1 and 2, not in the LLM.
`},{id:"blog-3",slug:"agentic-ai-langgraph-n8n",title:"Agentic AI in Practice: Building Real-World Automations with LangGraph and n8n",excerpt:"An AI agent that can plan, use tools, and self-correct is not science fiction anymore. Here is how I build them and what actually breaks in production.",date:"2026-04-05",tags:["AI Agents","LangGraph","Python","Automation"],readTime:"6 min read",related:["blog-2","blog-4"],content:`## What Makes an AI "Agentic"?

A regular LLM call is stateless: you send a prompt, you get a response. An agent is different — it has a **goal**, **tools** it can call, and a **loop** that runs until the goal is achieved or it runs out of steps.

At micro1, I've been building AI agents that handle real-world workflows. The architecture has evolved significantly from "just call GPT-4" to production systems that are reliable, auditable, and efficient.

## The Agent Loop

Every agent follows a basic loop:

\`\`\`
Observe → Think → Act → Observe → Think → Act → ... → Done
\`\`\`

In LangGraph, this is modeled as a directed graph:

\`\`\`python
from langgraph.graph import StateGraph, END

workflow = StateGraph(AgentState)
workflow.add_node("think", reasoning_node)
workflow.add_node("act", tool_execution_node)
workflow.add_node("observe", result_processing_node)

workflow.add_conditional_edges(
    "think",
    should_continue,
    {"continue": "act", "done": END}
)
\`\`\`

## Tool Design Matters More Than Model Choice

The most common mistake in agentic AI: spending too much time picking the LLM and too little time designing the tools.

A good agent tool has:
1. **A single, clear responsibility** — tools that do too much lead to incorrect tool selection
2. **Predictable input/output schemas** — use Pydantic models, not loose dicts
3. **Explicit error returns** — the agent needs to know when a tool fails and why
4. **Idempotency where possible** — agents may call the same tool multiple times

\`\`\`python
from pydantic import BaseModel

class SearchInput(BaseModel):
    query: str
    max_results: int = 5
    date_filter: str | None = None

class SearchOutput(BaseModel):
    results: list[dict]
    total_found: int
    error: str | None = None
\`\`\`

## Orchestrating with n8n

For workflows that mix AI steps with external services (APIs, databases, webhooks), n8n is excellent. It provides visual workflow orchestration and handles:

- Retry logic and error routing
- Webhook triggers and scheduled runs
- HTTP requests to external APIs
- Database read/write nodes

I use a pattern where LangGraph handles the AI reasoning loop and n8n handles the surrounding orchestration — triggering the agent, routing its output to the right destination, and sending notifications.

## The Planning Problem

Simple agents work on single-step tasks. Real tasks require multi-step planning:
- "Research competitor pricing" requires: identify competitors → scrape pricing pages → extract data → compare → summarize
- "Schedule a meeting" requires: check availability → find slot → send invites → add to calendar

For complex plans, I use a two-level architecture:
1. **Planner agent**: breaks the goal into subtasks
2. **Executor agent**: executes each subtask, reporting results back to the planner

This is more expensive but significantly more reliable than a single agent trying to do everything.

## What Breaks in Production

**1. Context window overflow**: agents accumulate tool results and the context grows until it hits the limit. Solution: summarize older results instead of retaining raw output.

**2. Tool selection errors**: the agent calls the wrong tool or with wrong parameters. Solution: add a validation step before execution, and use structured output forcing for tool calls.

**3. Infinite loops**: the agent keeps trying failed approaches. Solution: add a step counter and a "reflect on failure" node that forces a different strategy after N failed attempts.

**4. Hallucinated tool outputs**: the model sometimes generates what it "thinks" a tool would return instead of actually calling it. Solution: enforce tool calling via the model's function-calling API, never via free-text generation.

## The Future of Agentic AI

The shift from single-call AI to multi-step agents is the biggest change in practical AI engineering right now. The tooling is maturing fast — LangGraph's persistence layer, n8n's growing integration library, and better LLM function-calling support make production agents increasingly viable. The hard problems are no longer AI problems — they're software engineering problems.
`},{id:"blog-4",slug:"data-science-workflow-raw-data-to-deployed-model",title:"Data Science Workflow: From Raw Data to a Deployed ML Model",excerpt:"Clean data beats fancy algorithms every time. Here is the end-to-end workflow I follow for every data science project, from messy CSV to live prediction API.",date:"2026-03-18",tags:["Data Science","Python","Machine Learning","Scikit-learn"],readTime:"5 min read",related:["blog-5","blog-2"],content:`## The Workflow Nobody Talks About

Data science tutorials usually show you the glamorous part — fitting a model, plotting a learning curve, getting 94% accuracy. What they skip is everything around that: how you actually go from raw, messy data to a working system that runs in production.

Here's the workflow I follow on every project.

## Phase 1: Data Understanding (EDA)

Before writing a single line of ML code, spend time understanding your data:

\`\`\`python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

df = pd.read_csv('data.csv')

# Basic profiling
print(df.info())
print(df.describe())
print(df.isnull().sum())

# Distribution of target variable
df['target'].value_counts().plot(kind='bar')
\`\`\`

Key questions to answer in EDA:
- What is the shape and type of each feature?
- What is the distribution of the target variable? Is it imbalanced?
- Are there missing values? What pattern do they follow?
- Are there outliers? Are they real or data errors?
- Which features correlate with the target?

I use a correlation heatmap and Seaborn pairplots to answer the last two questions visually. Plotly Dash is useful when I need interactive EDA for stakeholders.

## Phase 2: Feature Engineering

This is where domain knowledge creates the most value. Raw features are rarely the best input to a model. Transformations that commonly help:

- **Log transforms** for right-skewed numerical features
- **Binning** continuous variables when the relationship is non-linear
- **Interaction features** for pairs of features that are more informative together
- **Date decomposition** (year, month, day-of-week, hour) from timestamp columns
- **Target encoding** for high-cardinality categoricals

\`\`\`python
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.pipeline import Pipeline

numeric_pipe = Pipeline([
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())
])
\`\`\`

Always build transformations inside a **Pipeline** so they apply consistently to training and inference data.

## Phase 3: Model Selection and Training

I start with simple baselines — a logistic regression or a decision tree. This gives me a baseline accuracy and helps identify whether the problem is hard (baseline is 51%) or easy (baseline is 89%).

Then I try:
1. **Random Forest** — robust, interpretable feature importances, hard to overfit catastrophically
2. **Gradient Boosting** (XGBoost or LightGBM) — usually best performance on tabular data
3. **Neural network** — only if the above two underperform or if the data is image/text/sequence

Use cross-validation, never a single train-test split:

\`\`\`python
from sklearn.model_selection import cross_val_score

scores = cross_val_score(model, X, y, cv=5, scoring='f1_macro')
print(f"CV F1: {scores.mean():.3f} \xb1 {scores.std():.3f}")
\`\`\`

## Phase 4: Evaluation Beyond Accuracy

Accuracy alone is misleading, especially on imbalanced datasets. Always report:
- **Confusion matrix**: to see where the model is failing
- **Precision/Recall/F1**: especially for imbalanced targets
- **ROC AUC**: for ranking quality
- **Calibration plot**: if the model outputs probabilities used for decisions

## Phase 5: Deployment with FastAPI

Once the model is validated, I serialize it with joblib and serve it via a FastAPI endpoint:

\`\`\`python
import joblib
from fastapi import FastAPI
from pydantic import BaseModel

model = joblib.load('model.pkl')
app = FastAPI()

class PredictRequest(BaseModel):
    features: list[float]

@app.post("/predict")
def predict(req: PredictRequest):
    prediction = model.predict([req.features])
    probability = model.predict_proba([req.features]).max()
    return {"prediction": int(prediction[0]), "confidence": float(probability)}
\`\`\`

Containerize with Docker for reproducibility:
\`\`\`dockerfile
FROM python:3.11-slim
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY model.pkl app.py ./
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
\`\`\`

## The Lesson

Eighty percent of time in data science is spent on phases 1 and 2. The model training is the easy part. Good EDA and thoughtful feature engineering will outperform hyperparameter tuning on a poorly understood dataset every single time.
`},{id:"blog-5",slug:"aws-solution-architect-real-lessons",title:"AWS Solution Architect: Real Architecture Lessons Beyond the Certification",excerpt:"Getting AWS certified teaches you what services exist. Building real systems teaches you which ones to actually use and which ones to avoid.",date:"2026-02-22",tags:["AWS","Cloud","DevOps","Architecture"],readTime:"6 min read",related:["blog-4"],content:`## What the Certification Gets Right (and Wrong)

Earning the AWS Solution Architect Associate certification gave me a solid map of the AWS ecosystem — EC2, S3, RDS, Lambda, VPC, IAM, CloudFront, Route 53, and dozens of other services. The exam tests whether you can identify the right service for a scenario.

What it doesn't teach you: how to actually make these choices under real constraints — budget, team expertise, time pressure, and the reality that "it depends" is the true answer to most architecture questions.

Here's what I've learned building real systems.

## The Serverless vs. Containers Decision

AWS Lambda is genuinely great for:
- Event-driven processing (S3 upload triggers, DynamoDB streams, API Gateway)
- Scheduled jobs that run infrequently
- Workloads with highly variable traffic

Lambda is wrong for:
- Jobs running longer than 15 minutes
- ML inference with large models (cold start + memory limits)
- Anything requiring persistent connections (WebSockets need ALB + ECS)
- Cost at sustained high throughput (EC2 or Fargate is cheaper above ~1M requests/month)

For most backend APIs, I now default to **Fargate** (serverless containers) over Lambda. It gives you more control over runtime, no cold starts on warm tasks, and the mental model is simpler.

## S3 is Not Just Storage

Most developers use S3 as a file store. It's actually the backbone for several patterns:

**Static site hosting**: S3 + CloudFront + Route 53 is the cheapest and most scalable way to host a static frontend. Costs cents per month at moderate traffic.

**Data lake foundation**: S3 with proper prefix organization (\`/year/month/day/\` partitioning) integrates directly with Athena for SQL queries over raw files without loading into a database.

**Event source**: S3 event notifications can trigger Lambda functions, SQS messages, or SNS notifications on object creation/deletion. This is the foundation for ETL pipelines that process uploaded files.

## IAM: The Thing That Will Actually Break Your Architecture

The most common cloud security failure is not "someone hacked in" — it's "the developer gave the Lambda function admin permissions because it was easier." IAM is boring and tedious and absolutely critical.

Principles I follow:
1. **Least privilege always**: every Lambda, ECS task, and EC2 instance gets an IAM role with only the specific permissions it needs
2. **No long-lived access keys**: use IAM roles and instance profiles, never hardcoded keys
3. **Enable CloudTrail**: API call logging is free and invaluable for debugging ("why did this fail at 3am?")

\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": ["s3:GetObject", "s3:PutObject"],
    "Resource": "arn:aws:s3:::my-specific-bucket/*"
  }]
}
\`\`\`

Not \`s3:*\`. Not \`*\`. Specific actions, specific resources.

## RDS vs. DynamoDB vs. Aurora Serverless

**Use RDS (PostgreSQL)** when: you have relational data with complex queries, your team knows SQL, and you need ACID transactions. This is the right default for most applications.

**Use DynamoDB** when: you need single-digit millisecond reads at any scale, you know your access patterns in advance, and you don't need ad-hoc queries. DynamoDB is excellent but requires upfront schema design that's completely different from relational modeling.

**Use Aurora Serverless v2** when: you have an RDS workload but traffic is highly variable and you want to save on idle costs. It scales down to near-zero and back up in seconds.

## Cost Control: The Architecture Skill Nobody Talks About

AWS can be devastatingly expensive when you're not careful. Things that surprise people:

- **Data transfer out** is not free. Egress from EC2/RDS/ELB to the internet costs money. Keep your services in the same AZ when possible.
- **NAT Gateway** charges per GB transferred. Use it only for services that truly need outbound internet access.
- **CloudWatch Logs** storage adds up. Set retention policies on every log group.

I set up **AWS Budgets** with email alerts at 80% and 100% of budget on every account I manage. It takes 5 minutes and has saved me from several "I left a GPU instance running" situations.

## The Architecture Philosophy

The best AWS architecture is the one that's simple enough for your team to operate at 2am when something breaks. Always ask: "what happens when this component fails?" If the answer is "we're down," either add redundancy or accept the risk explicitly. Don't assume it won't happen.
`}]}};
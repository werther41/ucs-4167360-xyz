---
title: The forecasting telephone game
date: 2026-09-10
summary: What happens when a simple suggestion for an email automation agent gets translated into a full-scale TimesFM forecasting pipeline in BigQuery.
tags:
  - machine-learning
  - data-engineering
  - product-management
kind: log
draft: false
---

A week ago, I wrapped up a forecasting pipeline using Google's new TimesFM foundation model. I had automated pipelines, elegant backtest validation, interactive Looker Studio dashboards, and rock-solid predictive metrics. 

Then I presented it to our supply chain lead, and he laughed. 

It turns out I had spent a week building an incredibly accurate solution to a problem that didn't exist, thanks to a classic corporate game of telephone.

## The message from above

On September 2nd, a message dropped in Slack from my engineering manager:

> "Hi, if you have bandwidth (lower priority vs PGDx work), could you please look into possibility of building an agent that anticipates kit/consumable needs ahead of time, i.e. using data from run monitoring and orders from NetSuite (talk to BS)."

My engineer brain immediately latched onto the phrase *"anticipates kit/consumable needs ahead of time."* 

To me, that sounded like a time-series forecasting problem. Back in 2024, I had built a baseline ARIMA forecast in BigQuery to try and predict order trends, so my immediate response was:

> "That sounds like time-based forecasting? Made one before back in 2024 with an ARIMA model in BigQuery. Not sure what an LLM agent can do with forecasting... but there is a new foundation model, TimesFM, for time series forecasting. I'll re-visit this."

I opened a Jira ticket under **ENG-20194** and drafted a clean, logical engineering plan:
1. Research Google's TimesFM model.
2. Build a prototype in BigQuery.
3. Integrate the pipeline into Airflow.
4. Run validation backtests and evaluate model accuracy.
5. Create a dashboard for the team.

It was a perfect, self-contained data science loop.

## Modern forecasting is too easy

One of the dangers of modern cloud data warehouses is that they make complex tasks incredibly easy to execute. In the past, spinning up a state-of-the-art foundation model for time series would have required dedicated GPU instances, PyTorch configuration, and a lot of glue code.

In 2026, Google Cloud lets you run TimesFM directly inside BigQuery using standard SQL via the `AI.FORECAST` function. You just point it at your historical table, specify your timestamp and data columns, and it handles the rest.

I wrote a quick test query against the public CitiBike dataset to verify the syntax:

```sql
WITH
  citibike_trips AS (
    SELECT EXTRACT(DATE FROM starttime) AS date, usertype, COUNT(*) AS num_trips
    FROM `bigquery-public-data.new_york.citibike_trips`
    GROUP BY date, usertype
  )
SELECT *
FROM
  AI.FORECAST(
    TABLE citibike_trips,
    data_col => 'num_trips',
    timestamp_col => 'date',
    id_cols => ['usertype'],
    horizon => 30,
    output_historical_time_series => true);
```

The output returned historical baselines and 30-day forecast horizons complete with upper and lower confidence intervals. It was seamless.

Encouraged by how simple the tooling was, I moved fast. I aggregate our historical sales, NetSuite order logs, and run monitoring data into a clean, unified schema. I fed it into `AI.FORECAST`, automated the model runs in Airflow, and set up a 13-week held-out backtest period to evaluate the performance.

The results were genuinely impressive. For high-volume products like our Total, Clear Safety, and Clear Dx lines, the Mean Absolute Scaled Error (MASE) vs. a naive random-walk baseline was well below `1.00`, proving the model had strong predictive value. (For lower-volume products, the model essentially defaulted to last week's count, but that was expected).

I built a connected Google Sheet linked to BigQuery, generated some charts, and wrapped the entire thing in a Looker Studio dashboard. 

I was ready for my triumph.

## The laughter in the room

I sat down with BS, our supply chain and reagent inventory lead, to show off the forecast. I walked him through the backtest validation, the Airflow automation, and the confidence intervals. 

BS listened, laughed, and then pulled up his inbox to forward me the email thread where the original request had originated.

The email chain painted a very different picture:
1. **The Trigger**: A high-profile customer had complained about a late shipment of consumables.
2. **The Root Cause**: Customer Support explained that there was a temporary technical glitch in our automated re-stock system. The system was supposed to check the customer's on-site inventory levels and automatically trigger a new order whenever their stock dipped below 5 kits. Because of the glitch, the check failed.
3. **The Delay**: On top of the glitch, BS confirmed that a backlog from Illumina delayed our own incoming shipment of flow cells, which put us behind on shipping to the customer.
4. **The CEO's Suggestion**: Our CEO saw the thread and replied: *"I am sure tasks like customer communication and inventory management can easily be automated with a simple agent. Maybe you can look into this and see how you can help."*

The CEO wanted a lightweight LLM agent to send a proactive email to the customer when a shipment was delayed, or perhaps run a simple API call to double-check inventory levels when a system glitch occurred. 

But as that request traveled down the chain of command:
* The CEO said: *"Let's build a simple agent to automate customer communication and inventory tracking."*
* The manager translated this to: *"Build an agent that anticipates kit/consumable needs ahead of time."*
* I translated this to: *"Build a cutting-edge TimesFM time-series machine learning model to forecast demand."*

By the time the ticket hit my desk, we had traded a straightforward webhook/email script for an AI-powered statistical forecast.

## The silver lining

It was a humbling reminder of a fundamental rule: **always talk to the end-users before you write a single line of code.** If I had scheduled a ten-minute chat with BS on day one, I would have skipped the forecasting pipeline entirely and built a simple communication agent instead.

However, the week of work wasn't entirely wasted. 

During our meeting, BS mentioned that our sales team's manual pipeline forecasting in Salesforce is notoriously unreliable because of sales sandbagging. The supply chain team has always struggled to know what to actually order. 

While the automated communication agent is still the immediate priority, having a baseline TimesFM model running in BigQuery gives BS an objective, data-driven second opinion on inventory demand that bypasses human bias.

I am pivoting now to build the actual inventory-check and communication agent the CEO asked for. But the next time I get a vague request passed down through three layers of management, I'll be scheduling a phone call first.
